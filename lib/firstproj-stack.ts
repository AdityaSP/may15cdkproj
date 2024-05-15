
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //L1 construct

    const r1 : cdk.aws_s3.CfnBucket.RuleProperty = {
            status: "Enabled",
            expirationInDays: 10,
          }

    const lcc : cdk.aws_s3.CfnBucket.LifecycleConfigurationProperty= {
      rules: [r1],
    };
        
    const cfnbucketprops: CfnBucketProps = {
      lifecycleConfiguration: lcc,
    };

    new cdk.aws_s3.CfnBucket(this, "MyS31", cfnbucketprops);

    //L2 construct
    const l2bucketprops :BucketProps = {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3),
        },
      ],
    };
    new cdk.aws_s3.Bucket(this, "MyS32", l2bucketprops)

    //L3 construct
    new OrgS3Bucket(this, "MyS3L3")
  }
}
