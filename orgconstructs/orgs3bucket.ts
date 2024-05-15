import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";

export class OrgS3Bucket extends Construct {
  constructor(scope: Construct, id: string) {

    super(scope, id);
    const l2bucketprops: BucketProps = {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3),
        },
      ],
    };
    new cdk.aws_s3.Bucket(this, id, l2bucketprops); 

  }
}