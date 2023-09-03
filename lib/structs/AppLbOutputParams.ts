
export interface AppLbOutputParams {
    public readonly httpListenerArn: string
    public readonly httpsListenerArn?: string
    public readonly loadBalancerArn: string
    public readonly loadBalancerDnsName: string
    public readonly loadBalancerSecurityGroupId: string
    public readonly loadBalancerCanonicalHostedZoneId: string
}