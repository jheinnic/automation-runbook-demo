import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import { CdkPipelineStack } from '../lib/stacks'

const ciEnv: cdk.Environment = { account: '284611682665', region: 'us-east-1' }
const env1: cdk.Environment = { account: '284611682665', region: 'us-east-1' }
const env2: cdk.Environment = { account: '811617080253', region: 'us-east-1' }

/*
const stackSynthesizer = new cdk.DefaultStackSynthesizer({
    qualifier: 'demo-ssm',
    bootstrapStackVersionSsmParameter: '/cdk-bootstrap/demo-ssm/version'
});
*/

const app = new cdk.App();

// iam.Role.customizeRoles(app, { preventSynthesis: false });

const pipeline = new CdkPipelineStack(app, 'bPipeline', {
    ciEnv: ciEnv, devEnv: env1, prodEnv: env2,
    // synthesizer: stackSynthesizer
});



app.synth();
