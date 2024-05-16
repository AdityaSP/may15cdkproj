
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. create an s3 bucket
    const websiteb = new cdk.aws_s3.Bucket(this, "website");

    const websiteS3BucketName = new cdk.CfnOutput(this, 'bucketname', {
      value: websiteb.bucketName,
      exportName: 'website-s3bucket-adi'
    })

    // // 2. move the file to an s3 bucket

    // new cdk.aws_s3_deployment.BucketDeployment(this, "websiteDeployment", {
    //   destinationBucket: websiteb,
    //   sources: [cdk.aws_s3_deployment.Source.asset("./code")],
    // });
  }
}
