import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class WebsiteDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucketName = cdk.Fn.importValue("website-s3bucket-adi");
    const websiteBucket = cdk.aws_s3.Bucket.fromBucketName(this, 'importbucket', websiteBucketName)

    // 2. move the file to an s3 bucket

    new cdk.aws_s3_deployment.BucketDeployment(this, "websiteDeployment", {
      destinationBucket: websiteBucket,
      sources: [cdk.aws_s3_deployment.Source.asset("./code")],
    });

  }
}
