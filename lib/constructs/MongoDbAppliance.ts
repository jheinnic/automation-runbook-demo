import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import { AbstractAppliance } from './AbstractAppliance'
import { MongoDbApplianceProps } from '../structs';

export class MongoDbAppliance extends AbstractAppliance<"vpcId"|"httpListener"> {
    private readonly environmentName: string;

    private static PARAMETER_VPC_ID = "vpcId";
    private static PARAMETER_HTTP_LISTENER = "httpListener";

    constructor(scope: Construct, id: string, props?: MongoDbApplianceProps) {
        super(scope, id, props); 
    }

    prefixWithEnvironmentName(str: string): string {
        return this.environmentName + "-" + str;
    }    

    createParameterName(environmentName: string, parameterName: string): string {
        return environmentName + "-Network-" + parameterName;
    }

    getVpcIdFromParameterStore(scope: Construct, environmentName: string): string {
        return StringParameter.fromStringParameterName(
            scope,
            MongoDbAppliance.PARAMETER_VPC_ID,
            this.createParameterName(environmentName, MongoDbAppliance.PARAMETER_VPC_ID)
        ).stringValue;
    }

    getHttpListenerArnFromParameterStore(scope: Construct, environmentName: string): string {
        return StringParameter.fromStringParameterName(
            scope,
            MongoDbAppliance.PARAMETER_HTTP_LISTENER,
            this.createParameterName(environmentName, MongoDbAppliance.PARAMETER_HTTP_LISTENER)
        ).stringValue;
    }
}