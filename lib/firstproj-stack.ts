
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    //cdk deploy --parameters expirationDaysParam=12
    const epp = new cdk.CfnParameter(this, "expirationDaysParam", {
      type: "Number",
      default: 10,
      minValue: 3,
      maxValue: 180,
    });

    //L1 construct
    const r1: cdk.aws_s3.CfnBucket.RuleProperty = {
      status: "Enabled",
      expirationInDays: epp.valueAsNumber,
    };

    const lcc: cdk.aws_s3.CfnBucket.LifecycleConfigurationProperty = {
      rules: [r1],
    };

    const cfnbucketprops: CfnBucketProps = {
      lifecycleConfiguration: lcc,
    };

    new cdk.aws_s3.CfnBucket(this, "MyS31", cfnbucketprops);

    //L2 construct
    const l2bucketprops: BucketProps = {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(epp.valueAsNumber),
          noncurrentVersionsToRetain: 4,
        },
      ],
    };
    new cdk.aws_s3.Bucket(this, "MyS32", l2bucketprops);

    //L3 construct
    new OrgS3Bucket(this, "MyS3L3");
  }
}
