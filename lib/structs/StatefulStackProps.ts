import { Size } from 'aws-cdk-lib/core'
import { StackProps } from 'aws-cdk-lib'
import { EbsDeviceVolumeType } from 'aws-cdk-lib/aws-ec2'

export interface StatefulStackProps extends StackProps {
    readonly v1: string;
    readonly amiId: string;
    readonly snapshotId?: string; 
    readonly volumeSize: Size;
    readonly volumeType: EbsDeviceVolumeType
}