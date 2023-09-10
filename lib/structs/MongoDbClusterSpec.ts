import { InstanceType } from "aws-cdk-lib/aws-ec2"

export interface MongoDbClusterSpec {
    readonly shardInstanceType: InstanceType
    readonly shardAmiId: string;
    readonly partitionCount: number
    readonly replicaCount: number
    readonly nodeStorage: number
} 