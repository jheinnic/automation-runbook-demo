import * as imagebuilder from 'aws-cdk-lib/aws-imagebuilder';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ImagePipeline } from 'cdk-image-pipeline'

import { AssetHelper } from '../classes/AssetHelper';
export class ImagePipelineStack extends Stack {
  readonly imagePipeline: ImagePipeline;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const mongo344Asset: Asset = AssetHelper.bindYamlFile(this, "Mongo344Component", "mongodb_component/mongodb-3_4_4.yaml")
    const mongo363Asset: Asset = AssetHelper.bindYamlFile(this, "Mongo344Component", "mongodb_component/mongodb-3_4_4.yaml")

    const mongo344Component = new imagebuilder.CfnComponent(this, 'MyCfnComponent', {
      name: 'mongodb344',
      platform: 'linux',
      version: '1.0.0',
      description: 'install MongoDB 3.4.4',
      supportedOsVersions: ['Ubuntu Pro 18.04', 'Ubuntu 18.04'],
      changeDescription: 'install MongoDB 3.4.4',
      kmsKeyId: 'kmsKeyId',
      tags: {
        costcenter: '10051227'
      },
      uri: mongo344Asset.s3ObjectUrl
    });
    const mongo363Component = new imagebuilder.CfnComponent(this, 'MyCfnComponent', {
      name: 'mongodb363',
      platform: 'linux',
      version: '1.0.0',
      description: 'install MongoDB 3.6.3',
      supportedOsVersions: ['Ubuntu Pro 18.04', 'Ubuntu 18.04'],
      changeDescription: 'install MongoDB 3.6.3',
      kmsKeyId: 'kmsKeyId',
      tags: {
        costcenter: '10051227'
      },
      uri: mongo363Asset.s3ObjectUrl
    });

    // The code that defines your stack goes here
    new ImagePipeline(this, "MyImagePipeline", {
      components: [
        {
          document: 'mongodb344',
          name: 'mongodb344',
          version: '1.0.0',
        }
      ],
      kmsKeyAlias: 'alias/my-key',
      profileName: 'ImagePipelineInstanceProfile',
      infraConfigName: 'MyInfrastructureConfiguration',
      imageRecipe: 'MyImageRecipe',
      pipelineName: 'MyImagePipeline',
      parentImage: 'ami-0e1d30f2c40c4c701'
    })
  }
}
