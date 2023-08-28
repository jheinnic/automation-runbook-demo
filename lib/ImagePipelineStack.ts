import {Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ImagePipeline } from 'cdk-image-pipeline'

import { AssetHelper } from './AssetHelper';

export class ImagePipelineS extends cdk.Stack {
  readonly imagePipeline: ImagePipeline;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new ImagePipeline(this, "MyImagePipeline", {
      components: [
        {
          document: 'component_example.yml',
          name: 'Component',
          version: '0.0.1',
        },
        {
          document: 'component_example_2.yml',
          name: 'Component2',
          version: '0.1.0',
        },
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
