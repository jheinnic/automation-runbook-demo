import { ISecurityGroup } from 'aws-cdk-lib/aws-ec2'
import { IRole } from 'aws-cdk-lib/aws-iam'
import { MongoDbClusterSpec } from '../structs'

export interface MongoDbApplianceProps {
    readonly clusterSpec: MongoDbClusterSpec
    readonly mongoRole?: IRole
    readonly mongoGroup?: ISecurityGroup
    readonly clientGroups?: ISecurityGroup[]
}