import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class AssetHelper {
    static getLambdaScript(relativePath: string) {
        return lambda.Code.fromAsset(path.join(__dirname, '..', 'assets', relativePath))
    }
}