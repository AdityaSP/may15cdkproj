
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  }
}
