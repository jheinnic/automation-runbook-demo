export interface NetworkOutputs {
    readonly vpcId: string;
    readonly isolatedSubnets: string[];
    readonly publicSubnets: string[];
    readonly availabilityZones: string[];
    readonly ecsClusterName: string;
}