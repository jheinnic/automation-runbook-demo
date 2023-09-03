import { Construct, ConstructProps } from "constructs"
import { StringParameter } from "aws-cdk-lib/aws_ssm"
import { AppDeployment, AbstractApplianceProperties } from "../structs"

export abstract class AbstractAppliance<OutParams extends string> extends Construct {
    protected readonly deployment: AppDeployment;
    protected readonly params: Record<OutParams, StringParameter>

    constructor(scope: Construct, id: string, props: AbstractApplianceProperties) {
        super(scope, id, props); 
        this.deployment = props.deployment
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