import { ISecurityGroup } from 'aws-cdk-lib/aws_ec2'
import { IRole } from 'aws-cdk-lib/aws_iam'
import { AppDeployment } from '../structs'


export interface MongoDbApplianceInputParams extends ConstructParams {
    readonly mongoRole: IRole
    readonly mongoGroup?: ISecurityGroup
    readonly clientGroups?: ISecurityGroup[]
    readonly appDeployment: AppDeployment
    readonly 
}