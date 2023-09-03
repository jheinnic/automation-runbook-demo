import { MachineType } from "aws-cdk-lib/aws_ec2"

export interface MongoCapacitySpec {
    readonly instanceClass: MachineType
    readonly partitionCount: number
    readonly replicaCount: number
    readonly nodeStorage: number
}