
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //1. image ?
    const linImage = new cdk.aws_ec2.AmazonLinuxImage();
    //2. instance type ?
    const insType = cdk.aws_ec2.InstanceType.of(cdk.aws_ec2.InstanceClass.T2, cdk.aws_ec2.InstanceSize.MICRO)

    //3. vpc ?
    const defaultVpc = cdk.aws_ec2.Vpc.fromLookup(this, 'default', {isDefault: true})

    //4. key pair: forSession
    const kp = cdk.aws_ec2.KeyPair.fromKeyPairName(this, 'forsessioncdkid', 'forSession')
    //5. ec2
    const myec2 = new cdk.aws_ec2.Instance(this, 'myInstance', {
      machineImage: linImage,
      instanceType: insType,
      vpc: defaultVpc,
      keyPair: kp
    })
  }
}
