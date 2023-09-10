export interface AppLbOutputs {
    readonly httpListenerArn: string
    readonly httpsListenerArn?: string
    readonly loadBalancerArn: string
    readonly loadBalancerDnsName: string
    readonly loadBalancerSecurityGroupId: string
    readonly loadBalancerCanonicalHostedZoneId: string
}