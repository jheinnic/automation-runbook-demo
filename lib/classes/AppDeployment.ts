import { StringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"

export class AppDeployment {
    private pathPrefix: string
    private keyPrefix: string

    constructor(public readonly applicationId: string, public readonly deploymentId: string) {
        this.pathPrefix = applicationId + "/" + deploymentId
        this.keyPrefix = applicationId + "-" + deploymentId
    }

    forRole(appRole: string): AppRoleDeployment {
        return new AppRoleDeployment(this.applicationId, this.deploymentId, appRole)
    }

    getParameterPath(parameterName: string): string {
        return this.pathPrefix + "/" + parameterName
    }

    getParameterKey(parameterName: string): string {
        return this.keyPrefix + "-" + parameterName;
    }

    lookupFromParameterStore(scope: Construct, applianceToken: string, parameterName: string): IParameter {
        constructId: string = this.getParameterKey(applianceToken, parameterName);
        return StringParameter.fromStringParameterName(
            scope, constructId, this.createParameterName(applianceToken, parameterName))
    }

    getHttpListenerArnFromParameterStore(scope: Construct, environmentName: string): string {
        return StringParameter.fromStringParameterName(scope, PARAMETER_HTTP_LISTENER, createParameterName(environmentName, PARAMETER_HTTP_LISTENER))
            .getStringValue();
    }
}