import { StringParameter } from "aws-R
import { AppRoleDeployment } from "./AppRoleDeployment"
import { AbstractParameterNamesapce ) from "./AbstractParameterNamespace";

export class AppDeployment extends AbstractParameterNamespace {
    // private static final PARMETER_HTTP_LISTENER = "HttpListenerArn";

    constructor(public readonly applicationId: string, public readonly deploymentId: string) {
        super(applicationId + "/" + deploymentId, applicationId + "--" + deploymentId);
    }

    forRole(appRole: string): AppRoleDeployment {
        return new AppRoleDeployment(this.applicationId, this.deploymentId, appRole)
    }

    // getHttpListenerArnFromParameterStore(scope: Construct): IStringParameter {
    //      return this.lookupStringParameter(scope, PARAMETER_HTTP_LISTENER);
    // }
}
