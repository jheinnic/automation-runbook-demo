import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { AutomationRunbookDemoStage } from '../AutomationRunbookDemoStage'

export class CdkPipelineStack extends cdk.Stack {
    // private codeSource: CodePipelineSource
    // private pipeline: CodePipeline

    constructor(scope: Construct, id: string, props: CdkPipelineStackProps ) {
        // provide your CI/CD account info here
        super(scope, id, { env: props.ciEnv });

        // const synthesizer: cdk.IStackSynthesizer = props.synthesizer;

	const codeSource = CodePipelineSource.gitHub('john-heinnickel/automation-runbook-demo', 'main', {
	authentication: SecretValue.secretsManager('csd/devops/ir_stack_pipeline')
        });
//            actionName: 'LoadSource',
//            connectionArn: 'arn:aws:codestar-connections:us-east-1:284611682665:connection/5695ad23-6e33-4634-a035-cbd18b0d8499',
//            codeBuildCloneOutput: false,
//            triggerOnPush: true
//        });

        const pipeline = new CodePipeline(this, 'aPipeline', {
            // we need to activate this for cross account deployments
            // pipelineName: 'Pipeline',
            crossAccountKeys: true,
            synth: new ShellStep('Synth', {
                // configure source repo here
                input: codeSource,
                // configure build steps here
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
            })
	    /*
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
	    */
        });
    
	const stackSynthesizer = new cdk.DefaultStackSynthesizer({
            qualifier: 'demo-ssm',
            bootstrapStackVersionSsmParameter: '/cdk-bootstrap/demo-ssm/version'
        });
        const wl1 = pipeline.addStage(
            new AutomationRunbookDemoStage(this, 'DevWorkload', {
                env: props.devEnv, synthesizer: stackSynthesizer
            }));
        const wl2 = pipeline.addStage(
            new AutomationRunbookDemoStage(this, 'ProdWorkload', {
                env: props.prodEnv, synthesizer: stackSynthesizer
            }));

        // cdk.Tags.of(wl1).add('Environment', 'non-prod')
        // cdk.Tags.of(wl1).add('deployment', 'wl1')

        // cdk.Tags.of(wl2).add('Environment', 'prod')
        // cdk.Tags.of(wl2).add('deployment', 'wl2')
        
        // const imdsv2Aspect = new ec2.InstanceRequireImdsv2Aspect();
        // cdk.Aspects.of(wl1).add(imdsv2Aspect)
        // cdk.Aspects.of(wl2).add(imdsv2Aspect)
        // cdk.Tags.of(wl1).add('costcenter', '10051227')
        // cdk.Tags.of(wl2).add('costcenter', '10051227')
        // cdk.Tags.of(wl1).add('group', 'csd')
        // cdk.Tags.of(wl2).add('group', 'csd')
        // cdk.Tags.of(wl1).add('group_beneficiary', 'csd')
        // cdk.Tags.of(wl2).add('group_beneficiary', 'csd')
    }
}

export interface CdkPipelineStackProps {
    ciEnv: cdk.Environment,
    devEnv: cdk.Environment,
    prodEnv: cdk.Environment
    // synthesizer: cdk.IStackSynthesizer
}
