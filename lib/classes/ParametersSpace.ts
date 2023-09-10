import { StringParameter, IStringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct, Node } from "constructs"
import { ParameterSpaceProps } from '../structs'


export class ParametersSpace extends Construct {
    private scope: Construct;
    private rootConstruct?: Construct;
    private rootParamsPath: string;
    private paramsPathPrefix: string;

    constructor(scope: Construct, props: ParameterSpaceProps) {
        super(scope, "SsmParams")

        this.scope = scope
        this.rootConstruct = props.rootConstruct
        this.rootParamsPath = props.rootParamsPath
        this.paramsPathPrefix = this.getConstructParamsPath(scope)
    }


    getConstructParamsPath(target: Construct): string {
        const targetNode = Node.of(target)
        let partialTargetPath = targetNode.path
        if (!!this.rootConstruct) {
            const rootNode = Node.of(this.rootConstruct)
            partialTargetPath = partialTargetPath.substring(rootNode.path.length)
        }
        return [this.rootParamsPath, partialTargetPath].join(Node.PATH_SEP)
    }

    private getOwnParamPath(paramName: string[]): string {
        return [this.paramsPathPrefix, paramName].join('/')
    }

    private getOwnParamKey(paramName: string): string {
        return [this.paramsPathPrefix, paramName].join('-')
    }

    private lookupParamPath(target: Construct, paramName: string): string {
        return [this.getConstructParamsPath(target), paramName].join('/')
    }

    private lookupParamKey(target: Construct, paramName: string): string {
        const targetNode = Node.of(target)
        return [targetNode.addr, paramName].join('-')
    }

    lookupStringParameter(paramTarget: Construct, paramName: string): IStringParameter {
        return StringParameter.fromStringParameterName(
            this.scope,
            this.lookupParamKey(paramTarget, paramName),
	        this.lookupParamPath(paramTarget, paramName)
        );
    }

    // lookupHttpListenerArnParameter(scope: Construct): IStringParameter {
    //       return this.lookupStringParameter(scope, PARAMETER_HTTP_LISTENER);
    // }
}
