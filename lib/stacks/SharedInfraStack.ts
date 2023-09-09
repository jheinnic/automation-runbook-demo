// file: lib/shared-infra-stack.ts
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';

export class SharedInfraStack extends Stack {
  public readonly vpc: Vpc;
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // assign a VPC to the class property SharedInfraStack
    this.vpc = new Vpc(this, 'TheVPC', {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 3,
      subnetConfiguration: [
        {
          cidrMask: 20,
          name: 'public',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 20,
          name: 'application',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 20,
          name: 'data',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
  }
}