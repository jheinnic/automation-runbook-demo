#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
// import { Workload, Tier } from 'shady-island'
import { InitialStage, StagingStage } from '../lib/AutomationRunbookDemoStage'

const app = new cdk.App({
  defaultStackSynthesizer: new cdk.DefaultStackSynthesizer({ qualifier: "demo-ssm" })
})
iam.Role.customizeRoles(app, { preventSynthesis: false })

const env1: cdk.Environment = { account: '811617080253', region: 'us-east-1' }
const env2: cdk.Environment = { account: '284611682665', region: 'us-east-1' }

// const tier1 = Tier.PRODUCTION
// const tier2 = Tier.DEVELOPMENT

const wl1 = new InitialStage(
  app, 'V1Stage', { env: env2, v1: 'abc' });
const wl2 = new StagingStage(
  app, 'V1V2Stage', { env: env2, v1: 'abc', v2: 'xyz' });
const wl3 = new InitialStage(
  app, 'V2Stage', { env: env2, v1: 'xyz' })

cdk.Tags.of(app).add('costcenter', '10051227')
cdk.Tags.of(app).add('group', 'csd')
cdk.Tags.of(app).add('group_beneficiary', 'csd')

cdk.Tags.of(wl1).add('Environment', 'non-prod')
cdk.Tags.of(wl1).add('deployment', 'wl1')

cdk.Tags.of(wl2).add('Environment', 'non-prod')
cdk.Tags.of(wl2).add('deployment', 'wl2')

const imdsv2Aspect = new ec2.InstanceRequireImdsv2Aspect();
Aspects.of(app).add(imdsv2Aspect)