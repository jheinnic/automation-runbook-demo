import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import * as path from 'path';

export class AssetHelper {
    static getLambdaScript(relativePath: string) {
        return lambda.Code.fromAsset(path.join(__dirname, '..', 'assets', relativePath))
    }

    static bindYamlFile(scope: Construct, id: string, relativePath: string) {
        return new Asset(scope, id, {
            path: path.join(__dirname, '..', 'assets', 'relativePath'),
            deployTime: false
        });
    }
}
