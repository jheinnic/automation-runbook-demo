import { Stage, StageProps } from "aws-cdk-lib"
import { Construct } from 'constructs'

import { AutomationRunbookDemoStack } from './stacks/AutomationRunbookDemoStack'
import { StatefulStack } from './stacks/StatefulStack'

export class AutomationRunbookDemoStage extends Stage {
    // stack: AutomationRunbookDemoStack
    // statefulStack: StatefulStack

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)
        const statefulStack = new StatefulStack(this, 'StatefulStack');
        const stack = new AutomationRunbookDemoStack(this, 'AutomationRunbookDemoStack');
    }
}
