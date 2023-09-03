import * as iam from "aws-cdk-lib/aws-iam"
import * as ec2 from "aws-cdk-lib/aws-ec2" 
import * as kms from "aws-cdk-lib/aws-kms" 
// import { LaunchTemplateRequireImdsv2Aspect } from "aws-cdk-lib/aws-ec2/aspects"
import { Size } from "aws-cdk-lib/core"
import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

export class StatefulStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
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
        const dataVolumeB: ec2.IVolume = new ec2.Volume(this, 'DataVolumeB', {
            size: Size.gibibytes(50),
            availabilityZone: 'us-east-1c',
            encryptionKey: ebsKey,
            encrypted: true,
            // enableMultiAttach: true
        })

        // Create the EC2 instance
        const ec2InstanceA = new ec2.Instance(this, 'EC2InstanceA2', {
            vpc: myVpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.MEDIUM),
            machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
            role: nodeRole,
            securityGroup: secGrp,
            requireImdsv2: true,
            detailedMonitoring: true,
            ssmSessionPermissions: true,
            associatePublicIpAddress: false,
            propagateTagsToVolumeOnCreation: true,
        })
        const ec2InstanceB = new ec2.Instance(this, 'EC2InstanceB2', {
            vpc: myVpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.MEDIUM),
            machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
            role: nodeRole,
            securityGroup: secGrp,
            requireImdsv2: true,
            detailedMonitoring: true,
            ssmSessionPermissions: true,
            associatePublicIpAddress: false,
            propagateTagsToVolumeOnCreation: true,
        })

        // Attach the data volumes
        dataVolumeA.grantAttachVolumeByResourceTag(ec2InstanceA, [ec2InstanceA]);
        dataVolumeA.grantDetachVolumeByResourceTag(ec2InstanceA, [ec2InstanceA]);
        dataVolumeB.grantAttachVolumeByResourceTag(ec2InstanceB, [ec2InstanceB]);
        dataVolumeB.grantDetachVolumeByResourceTag(ec2InstanceB, [ec2InstanceB]);
    }
}