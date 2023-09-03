import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { AutomationRunbookDemoStage } from '../AutomationRunbookDemoStage'

export class CdkPipelineStack extends cdk.Stack {
    private codeSource: pipelines.CodePipelineSource
    private pipeline: pipelines.CodePipeline

    constructor(scope: Construct, props: CdkPipelineStackProps ) {
        // provide your CI/CD account info here
        super(scope, 'CdkPipeline', { env: props.ciEnv });
        this.codeSource = pipelines.CodePipelineSource.connection('john-heinnickel/automation-runbook-demo', 'main', {
            connectionArn: 'arn:aws:codestar-connections:us-east-1:284611682665:connection/5695ad23-6e33-4634-a035-cbd18b0d8499',
            codeBuildCloneOutput: true,
            triggerOnPush: true
        });
        this.pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            // we need to activate this for cross account deployments
            crossAccountKeys: true,
            synth: new pipelines.ShellStep('Synth', {
                // configure source repo here
                input: this.codeSource,
                // configure installation of dependencies here
                installCommands: ['npm install --frozen-lockfile'],
                // configure build steps here
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
            }),
            codeBuildDefaults: {
                rolePolicy: [iam.PolicyStatement.fromJson({
                    "Condition": {
                        "ForAnyValue:StringEquals": {
                            "iam:ResourceTag/aws-cdk:bootstrap-role": [
                                "image-publishing",
                                "file-publishing",
                                "deploy"
                            ]
                        }
                    },
                    "Action": "sts:AssumeRole",
                    "Resource": "arn:*:iam::811617080253:role/*",
                    "Effect": "Allow"
                })]
            }
        });
    
        const wl1 = new AutomationRunbookDemoStage(this, 'DevWorkload', { env: props.devEnv });
        cdk.Tags.of(wl1).add('Environment', 'non-prod')
        cdk.Tags.of(wl1).add('deployment', 'wl1')

        const wl2 = new AutomationRunbookDemoStage(this, 'ProdWorkload', { env: props.prodEnv });
        cdk.Tags.of(wl2).add('Environment', 'prod')
        cdk.Tags.of(wl2).add('deployment', 'wl2')
        
        const imdsv2Aspect = new ec2.InstanceRequireImdsv2Aspect();
        cdk.Aspects.of(this).add(imdsv2Aspect)
        cdk.Tags.of(this).add('costcenter', '10051227')
        cdk.Tags.of(this).add('group', 'csd')
        cdk.Tags.of(this).add('group_beneficiary', 'csd')

        this.pipeline.addStage(wl1);
        this.pipeline.addStage(wl2);
    }
}

export interface CdkPipelineStackProps {
    ciEnv: cdk.Environment,
    devEnv: cdk.Environment,
    prodEnv: cdk.Environment
}