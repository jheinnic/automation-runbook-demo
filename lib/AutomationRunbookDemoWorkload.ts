import { Construct } from 'constructs'
import { Workload, WorkloadProps } from 'shady-island'
import { AutomationRunbookDemoStack } from './AutomationRunbookDemoStack'
import { StatefulStack } from './StatefulStack'

export class AutomationRunbookDemoWorkload extends Workload {
    stack: AutomationRunbookDemoStack
    statefulStack: StatefulStack

    constructor(scope: Construct, id: string, props: WorkloadProps) {
        super(scope, id, props)
        this.statefulStack = new StatefulStack(this, 'StatefulStack', { env: props.env });
        this.stack = new AutomationRunbookDemoStack(this, 'AutomationRunbookDemoStack', { env: props.env })
    }
}