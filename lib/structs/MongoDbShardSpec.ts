import { Size } from 'aws-cdk-lib/core'
import { StackProps } from 'aws-cdk-lib'
import { EbsDeviceVolumeType } from 'aws-cdk-lib/aws-ec2'

export interface MongoDbShardSpec {
    readonly snapshotId?: string; 
    readonly volumeSize: Size;
    readonly volumeType: EbsDeviceVolumeType
}