import { Environment, SecretValue, Stack, Tags } from 'aws-cdk-lib'
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

import { AutomationRunbookDemoStage } from '../AutomationRunbookDemoStage'

export class CdkPipelineStack extends Stack {
    private codeSource: CodePipelineSource
    private pipeline: CodePipeline

    constructor(scope: Construct, id: string, props: CdkPipelineStackProps) {
        // provide your CI/CD account info here
        super(scope, id, { env: props.ciEnv })

        // const synthesizer: cdk.IStackSynthesizer = props.synthesizer;

        this.codeSource = CodePipelineSource.gitHub('john-heinnickel/automation-runbook-demo', 'main', {
            authentication: SecretValue.secretsManager('csd/devops/ir_stack_pipeline')
        })

        this.pipeline = new CodePipeline(this, 'aPipeline', {
            // we need to activate this for cross account deployments
            crossAccountKeys: true,
            synth: new ShellStep('Synth', {
                input: this.codeSource,
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
        })
    
        /*const stackSynthesizer = new cdk.DefaultStackSynthesizer({
            qualifier: 'demo-ssm',
            bootstrapStackVersionSsmParameter: '/cdk-bootstrap/demo-ssm/version'
        });*/
        const wl1 = new AutomationRunbookDemoStage(this, 'DevWorkload', {
            env: props.devEnv // , synthesizer: stackSynthesizer
        })
        const wl2 = new AutomationRunbookDemoStage(this, 'ProdWorkload', {
            env: props.prodEnv // , synthesizer: stackSynthesizer
        })

        Tags.of(wl1).add('Environment', 'nonprod')
        Tags.of(wl1).add('deployment', 'wl1')

        Tags.of(wl2).add('Environment', 'prod')
        Tags.of(wl2).add('deployment', 'wl2')
        
        // const imdsv2Aspect = new ec2.InstanceRequireImdsv2Aspect();
        // cdk.Aspects.of(wl1).add(imdsv2Aspect)
        // cdk.Aspects.of(wl2).add(imdsv2Aspect)
        [wl1, wl2].foreach(wl => {
            Tags.of(wl).add('costcenter', '10051227')
            Tags.of(wl).add('group', 'GSG')
            Tags.of(wl).add('group_beneficiary', 'GSG')
            Tags.of(wl).add('division', 'CSD')
        })

        this.pipeline.addStage(wl1)
        this.pipeline.addStage(wl2, {
            pre: [ new ManualApprovalStep('AcceptIt', { comment: 'Do you accept this?' }) ]
        })
    }

    public synth(): void {
        this.pipeline.buildPipeline();
    }
}

export interface CdkPipelineStackProps {
    ciEnv: Environment;
    devEnv: Environment;
    prodEnv: Environment;
    // synthesizer: cdk.IStackSynthesizer
}
