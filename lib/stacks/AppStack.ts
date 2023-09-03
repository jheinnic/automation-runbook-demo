import * as iam from "aws-cdk-lib/aws-iam"
import * as ec2 from "aws-cdk-lib/aws-ec2" 
import * as kms from "aws-cdk-lib/aws-kms" 
import { ParameterTier, ParameterType, StringParameter } from 'aws-cdk-lib/aws-ssm'
// import { LaunchTemplateRequireImdsv2Aspect } from "aws-cdk-lib/aws-ec2/aspects"
import { Size } from "aws-cdk-lib/core"
import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

export class StatefulStack extends Stack {

    constructor(scope: Construct, id: string, props?: StatefulStackProps) {
        super(scope, id, props)

        const myVpc = new ec2.Vpc(this, 'VPC')

        const nodeRole = new iam.Role(this, 'NodeRole', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
        })
        const nodeInstProf = new iam.InstanceProfile(this, 'NodeInstanceProfile', {
            role: nodeRole
        })
        const secGrp = new ec2.SecurityGroup(this, "SgNode", {
            vpc: myVpc
        })

        const ebsKey = kms.Key.fromLookup(this, "EbsKey", { aliasName: "alias/aws/ebs" })
        const dataVolumeA: ec2.IVolume = new ec2.Volume(this, 'DataVolumeA', {
            size: Size.gibibytes(50),
            availabilityZone: 'us-east-1c',
            encryptionKey: ebsKey,
            encrypted: true
        })

        const parameter = new StringParameter(this, "amiParam", {
            stringValue: 'ami-00000000000',
            dataType: ParameterDataType.AWS_EC2_IMAGE,
            parameterName: 'demo/amiParam',
            description: 'ami delivery',
            tier: ParameterTier.STANDARD
        })
        const resolveSsmParameterAtLaunchImage = new ec2.ResolveSsmParameterAtLaunchImage(
            'parameterName', {
                cachedInContext: false,
                os: ec2.OperatingSystemType.LINUX,
                // parameterVersion: 'parameterVersion',
                // userData: userData,
            }
        );

        // Create the EC2 instance
        const ec2InstanceA = new ec2.Instance(this, 'EC2InstanceA2', {
            vpc: myVpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.MEDIUM),
            machineImage: resolveSsmParameterAtLaunchImage,
            blockDevices: [
                {
                    device: '/dev/sdf',
                    volume: ec2.BlockDeviceVolume.ebsDeviceFromSnapshot('snapshot-id', {
                        deleteOnTermination: false,
                        volumeType: EbsDeviceVolumeType.STANDARD
                    })
                }
            ],
            role: nodeRole,
            securityGroup: secGrp,
            vpcSubnets: myVpc.selectSubnets({ subnetType: ec2.SubnetType.PRIVATE }),
            requireImdsv2: true,
            detailedMonitoring: true,
            ssmSessionPermissions: true,
            associatePublicIpAddress: false,
            propagateTagsToVolumeOnCreation: true,
        })

        // Attach the data volumes
        // dataVolumeA.grantAttachVolumeByResourceTag(ec2InstanceA, [ec2InstanceA]);
        // dataVolumeA.grantDetachVolumeByResourceTag(ec2InstanceA, [ec2InstanceA]);
    }
}

export interface StatefulStackProps {
    v1: string;
    amiId: string;
    snapshotId?: string; 
    volumeSize: Size
    volumeType: EbsDeviceVolumeType
}