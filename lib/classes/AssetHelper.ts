import { Code } from 'aws-cdk-lib/aws-lambda';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import { join } from 'path';


const ASSETS_ROOT = join(__dirname, '..', '..', 'assets')

export class AssetHelper {
    static getLambdaScript(relativePath: string) {
        return Code.fromAsset(join(ASSETS_ROOT, relativePath))
    }

    static bindYamlFile(scope: Construct, id: string, relativePath: string): Asset {
        return new Asset(scope, id, {
            path: join(ASSETS_ROOT, relativePath),
            deployTime: false
        });
    }
}
