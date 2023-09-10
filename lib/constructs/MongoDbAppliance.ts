import { StringParameter, IStringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import { ParametersSpace } from '../classes/ParametersSpace'
import { MongoDbApplianceProps, MongoDbClusterSpec } from '../structs';

const PARAMETER_VPC_ID = "vpcId";
const PARAMETER_HTTP_LISTENER = "httpListener";

export class MongoDbAppliance extends Construct {
    private readonly clusterSpec: MongoDbClusterSpec;
    private readonly parametersSpace: ParametersSpace;

    constructor(scope: Construct, id: string, props: MongoDbApplianceProps) {
        super(scope, id); 
        this.clusterSpec = props.clusterSpec;
        this.parametersSpace = new ParametersSpace(scope, {
            rootParamsPath: '/tbd/deployment'
        })

        // TODO: Genuine construction
    }
   
    getVpcIdFromParameterStore(scope: Construct): string { // }, environmentName: string): string {
        const param: IStringParameter = this.parametersSpace.lookupStringParameter(scope, PARAMETER_VPC_ID)
        return param.stringValue
    }

    getHttpListenerArnFromParameterStore(scope: Construct): string { // }, environmentName: string): string {
        const param: IStringParameter = this.parametersSpace.lookupStringParameter(scope, PARAMETER_HTTP_LISTENER)
        return param.stringValue
    }
}