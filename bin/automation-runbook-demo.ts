#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Workload, Tier } from 'shady-island'
import { AutomationRunbookDemoWorkload } from '../lib/AutomationRunbookDemoWorkload'

const app = new cdk.App({
  defaultStackSynthesizer: new cdk.DefaultStackSynthesizer({ qualifier: "demo-ssm" })
})
iam.Role.customizeRoles(app, { preventSynthesis: false })

const env1: cdk.Environment = { account: '811617080253', region: 'us-east-1' }
const env2: cdk.Environment = { account: '284611682665', region: 'us-east-1' }

const tier1 = Tier.PRODUCTION
const tier2 = Tier.DEVELOPMENT

const wl1 = new AutomationRunbookDemoWorkload(
  app, 'DevWorkload', {
  tier: tier1, baseDomainName: 'xyz.com', workloadName: 'dev', env: env1, contextFile: 'dev.json'
})
const wl2 = new AutomationRunbookDemoWorkload(
  app, 'ProdWorkload', {
  tier: tier2, baseDomainName: 'abc.com', workloadName: 'prd', env: env2, contextFile: 'prd.json'
})

cdk.Tags.of(app).add('costcenter', '10051227')
cdk.Tags.of(app).add('group', 'csd')
cdk.Tags.of(app).add('group_beneficiary', 'csd')

cdk.Tags.of(wl1).add('Environment', 'prod')
cdk.Tags.of(wl1).add('deployment', 'wl1')

cdk.Tags.of(wl2).add('Environment', 'non-prod')
cdk.Tags.of(wl2).add('deployment', 'wl2')
