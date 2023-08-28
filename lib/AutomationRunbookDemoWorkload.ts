import { Construct } from 'constructs'
import { Workload, WorkloadProps } from 'shady-island'
import { AutomationRunbookDemoStack } from './AutomationRunbookDemoStack'

export class AutomationRunbookDemoWorkload extends Workload {
    stack: AutomationRunbookDemoStack

    constructor(scope: Construct, id: string, props: WorkloadProps) {
        super(scope, id, props)
        this.stack = new AutomationRunbookDemoStack(this, 'AutomationRunbookDemoStack', { env: props.env })
    }
}