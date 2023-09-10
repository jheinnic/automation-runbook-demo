import { Stage } from 'aws-cdk-lib'
import { Size } from 'aws-cdk-lib/core'
import { Construct } from 'constructs'

import { AutomationRunbookDemoStageProps } from './structs'
import { AutomationRunbookDemoStack } from './stacks/AutomationRunbookDemoStack'
import { StatefulStack } from './stacks/StatefulStack'
import { EbsDeviceVolumeType } from "aws-cdk-lib/aws-ec2/lib/volume.js"

export class AutomationRunbookDemoStage extends Stage {
    stack: AutomationRunbookDemoStack
    statefulStack: StatefulStack

    constructor(scope: Construct, id: string, props: AutomationRunbookDemoStageProps) {
        super(scope, id, props)

        this.statefulStack = new StatefulStack(this, 'StatefulStack', {
            v1: "v1",
            amiId: "ami-abc",
            snapshotId: "snap-xyz",
            volumeType: EbsDeviceVolumeType.STANDARD,
            volumeSize: Size.gibibytes(36),
            synthesizer: props.synthesizer
        });
        this.stack = new AutomationRunbookDemoStack(this, 'AutomationRunbookDemoStack', {
            synthesizer: props.synthesizer
        });
    }
}
