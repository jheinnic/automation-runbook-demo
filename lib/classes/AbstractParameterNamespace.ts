import { StringParameter, IStringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"

export abstract class AbstractParameterNamespace {
    constructor(private pathPrefix: string, private keyPrefix: string) { }

    getParameterPath(parameterName: string): string {
        return this.pathPrefix + "/" + parameterName
    }

    getParameterKey(parameterName: string): string {
        return this.keyPrefix + "-" + parameterName;
    }

    lookupStringParameter(scope: Construct, parameterName: string): IStringParameter {
        return StringParameter.fromStringParameterName(
            scope,
            this.getParameterKey(parameterName),
	    this.getParameterPath(parameterName)
	);
    }

    // lookupHttpListenerArnParameter(scope: Construct): IStringParameter {
    //       return this.lookupStringParameter(scope, PARAMETER_HTTP_LISTENER);
    // }
}
