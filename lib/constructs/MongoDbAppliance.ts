import { Construct } from 'contracts'
import { AbstractAppliance } from './AbstractAppliance'

export class MongoDbAppliance extends AbstractAppliance {
    private readonly environmentName: string;

    constructor(scope: Construct, id: string, props?: cdk.ConstructProps) {
        super(scope, id, props); 
    }

    prefixWithEnvironmentName(str: string): string {
        return this.environmentName + "-" + str;
    }    

    createParameterName(environmentName: string, parameterName: string): string {
        return environmentName + "-Network-" + parameterName;
    }

    getVpcIdFromParameterStore(environmentName: string, parameterName: string): string {
        return StringParameter.fromStringParameterName(scope, PARAMETER_VPC_ID, createParameterName(environmentName, PARAMETER_VPC_ID))
            .getStringValue();
    }

    getHttpListenerArnFromParameterStore(scope: Construct, environmentName: string): string {
        return StringParameter.fromStringParameterName(scope, PARAMETER_HTTP_LISTENER, createParameterName(environmentName, PARAMETER_HTTP_LISTENER))
            .getStringValue();
    }
}