import { ConstructProperties } from "constructs"
import { AppDeployment } from "./AppDeployment"

export interface AppConstructProperties<OutParams extends string> extends ConstructProperties {
    readonly deployment: AppDeployment
    readonly applianceToken: string
    readonly outputParamNames: OutParams[]
}