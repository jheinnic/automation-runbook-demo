import { InstanceType } from "aws-cdk-lib/aws-ec2"

export interface MongoCapacitySpec {
    readonly instanceType: InstanceType
    readonly partitionCount: number
    readonly replicaCount: number
    readonly nodeStorage: number
} 