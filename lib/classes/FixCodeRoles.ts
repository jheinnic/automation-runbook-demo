import { IAspect } from 'aws-cdk-lib'
import { ArnPrincipal, CfnRole, Effect, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam'
import { IConstruct, Node } from 'constructs'

export class FixCodeRoles implements IAspect {
    private pipelineRole?: CfnRole
    private actionRole?: Role

    visit(node: IConstruct): void {
        const nodeNode = Node.of(node)
        const path = nodeNode.path
        if (path === 'bPipeline/aPipeline/Pipeline/Role/Resource') {
            this.pipelineRole = node as CfnRole
        } else if (path === 'bPipeline/aPipeline/Pipeline/ProdWorkload/AcceptIt/CodePipelineActionRole') {
            this.actionRole = node as Role
        } else {
            return
        }

        if ((!!this.actionRole) && (!!this.pipelineRole)) {
            console.log('Fix: <', this.pipelineRole, ', ', this.actionRole, '>');
            if (this.actionRole.assumeRolePolicy) {
                new ArnPrincipal(
                    this.pipelineRole.getAtt("Arn").toString()
                ).addToAssumeRolePolicy(
                    this.actionRole.assumeRolePolicy
                );
            } else {
                // TODO: Allocate the missing assume role policy?
                new ArnPrincipal(
                    this.pipelineRole.getAtt("Arn").toString()
                ).addToAssumeRolePolicy(
                    this.actionRole.assumeRolePolicy!
                );
            }
            /*
            this.actionRole.assumeRolePolicy?.addStatements(
                new PolicyStatement({
                    actions: ['sts:AssumeRole'],
                    effect: Effect.ALLOW,
                    principals: [
                        new ArnPrincipal(
                            this.pipelineRole.getAtt("arn").toString()
                        )
                    ],
                }),
            );
            */
        }
    }
} 
