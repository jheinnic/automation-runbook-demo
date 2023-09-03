import { StringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"

export abstract class AbstractParameterNamespace {
    private pathPrefix: string
    private keyPrefix: string

    constructor(private pathPrefix: string, private keyPrefix: string) { }

    getParameterPath(parameterName: string): string {
        return this.pathPrefix + "/" + parameterName
    }

    getParameterKey(parameterName: string): string {
        return this.keyPrefix + "-" + parameterName;
    }

    lookupStringParameter(scope: Construct, parameterName: string): IStringParameter {
        constructId: string = this.getParameterKey(applianceToken, parameterName);
        return StringParameter.fromStringParameterName(
            scope, constructId, this.createParameterName(applianceToken, parameterName))
    }

    getHttpListenerArnFromParameterStore(scope: Construct, environmentName: string): string {
        return StringParameter.fromStringParameterName(scope, PARAMETER_HTTP_LISTENER, createParameterName(environmentName, PARAMETER_HTTP_LISTENER))
            .getStringValue();
    }
}