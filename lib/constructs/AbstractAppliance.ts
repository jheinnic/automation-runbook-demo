import { Construct } from 'constructs'
import { IStringParameter } from 'aws-cdk-lib/aws-ssm'
import { AppDeployment } from '../classes/AppDeployment'
import { AbstractApplianceProps } from '../structs'

const PARAMETER_VPC_ID = 'vpcId'
const PARAMETER_HTTP_LISTENER = 'httpListener'

export abstract class AbstractAppliance<OutParams extends string> extends Construct {
    protected readonly deployment: AppDeployment;
    protected readonly params: Record<OutParams, IStringParameter>

    constructor(scope: Construct, id: string, props: AbstractApplianceProps) {
        super(scope, id); 
        this.deployment = props.deployment
    }

    getVpcIdFromParameterStore(scope: Construct, environmentName: string): string {
        const deploymentRole = this.deployment.forRole(environmentName)
        const param: IStringParameter = deploymentRole.lookupStringParameter(scope, PARAMETER_VPC_ID)
        return param.stringValue
    }

    getHttpListenerArnFromParameterStore(scope: Construct, environmentName: string): string {
        const deploymentRole = this.deployment.forRole(environmentName)
        const param: IStringParameter = deploymentRole.lookupStringParameter(scope, PARAMETER_HTTP_LISTENER)
        return param.stringValue
    }
}