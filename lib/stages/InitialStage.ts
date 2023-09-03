import { Construct } from 'constructs'
// import { Workload, WorkloadProps } from 'shady-island'
import { Stage, StageProps } from "aws-cdk-lib"
import { AppStack } from './stacks/AppStack'

export class InitialStage extends Stage {
    appStack: AppStack

    constructor(scope: Construct, id: string, props: InitialProps) {
        super(scope, id, props)
        v1: string = props.v1
        this.appStack = new AppStack(this, v1 + 'Stack', {v1: v1}); // { env: props.env });
    }
}

export interface InitialProps extends StageProps {
    v1: string
}