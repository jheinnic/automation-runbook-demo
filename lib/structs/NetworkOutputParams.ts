export interface NetworkOutputParams {
    public readonly vpcId: string;
    public readonly isolatedSubnets: string[];
    public readonly publicSubnets: string[];
    public readonly availabilityZones: string[];
}
    public readonly ecsClusterName: string;