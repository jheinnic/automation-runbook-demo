import { Stage } from "aws-cdk-lib"
import { Construct } from 'constructs'

import { AutomationRunbookDemoStageProps } from './structs'
import { AutomationRunbookDemoStack } from './stacks/AutomationRunbookDemoStack'
import { StatefulStack } from './stacks/StatefulStack'

export class AutomationRunbookDemoStage extends Stage {
    stack: AutomationRunbookDemoStack
    statefulStack: StatefulStack

    constructor(scope: Construct, id: string, props: AutomationRunbookDemoStageProps) {
        super(scope, id, props)

        this.statefulStack = new StatefulStack(this, 'StatefulStack', {
            synthesizer: props.synthesizer
        });
        this.stack = new AutomationRunbookDemoStack(this, 'AutomationRunbookDemoStack', {
            synthesizer: props.synthesizer
        });
    }
}
