import { StringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"

import { AbstractParameterNamespace } from "./AbstractParameterNamespace"

export class AppRoleDeployment extends AbstractParameterNamespace {
    constructor(public readonly applicationId: string, public readonly deploymentId: string, public readonly appRole: string) {
        super(applicationId + "/" + deploymentId + "/" + appRole, applicationId + "--" + deploymentId + "--" + appRole);
    }
}
