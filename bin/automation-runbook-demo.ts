#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import { AutomationRunbookDemoStack } from '../lib/automation-runbook-demo-stack'

const app = new cdk.App({
  defaultStackSynthesizer: new cdk.DefaultStackSynthesizer({ qualifier: "demo-ssm" })
})
iam.Role.customizeRoles(app, { preventSynthesis: false })

new AutomationRunbookDemoStack(app, 'AutomationRunbookDemoStack', {
  // env: { account: '811617080253', region: 'us-east-2' },
  env: { account: '284611682665', region: 'us-east-2' },
});