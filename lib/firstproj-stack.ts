
import * as cdk from "aws-cdk-lib";
import { BucketProps, CfnBucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { OrgS3Bucket } from "../orgconstructs/orgs3bucket";
import { Ec2Action } from "aws-cdk-lib/aws-cloudwatch-actions";

export class FirstprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const defaultVPC = cdk.aws_ec2.Vpc.fromLookup(this, "default", {
      isDefault: true,
    });

    const dbengine = cdk.aws_rds.DatabaseInstanceEngine.POSTGRES;

    const ins = cdk.aws_ec2.InstanceType.of(
      cdk.aws_ec2.InstanceClass.T3,
      cdk.aws_ec2.InstanceSize.MICRO
    );

    // Create a secret with a high level DatabaseSecret class which abstracts out the creation of a secret and makes it easy
    const secret = new cdk.aws_rds.DatabaseSecret(this, "postgresdb", {
      username: "clusteradmin",
      secretName: "MYDBSECRET",
    });

    // Create of a secret generically through the secretmanage. But the database wants the data in username, password key words only
    const gensec = new cdk.aws_secretsmanager.Secret(this, "gensec", {
      secretName: "GENSEC",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "dbroot" }),
        generateStringKey: "password",
      },
    });

    const db = new cdk.aws_rds.DatabaseInstance(this, "mydb", {
      vpc: defaultVPC,
      engine: dbengine,
      instanceType: ins,
      port: 3306,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      credentials: cdk.aws_rds.Credentials.fromSecret(secret),
      vpcSubnets: { subnetType: cdk.aws_ec2.SubnetType.PUBLIC },
    });

    // Secret rotation
    // const mastersecret = new cdk.aws_rds.DatabaseSecret(this, "postgresdb", {
    //   username: "masteradmin",
    // });

    // new cdk.aws_secretsmanager.SecretRotation(this, "SecretRotation", {
    //   application:
    //     cdk.aws_secretsmanager.SecretRotationApplication
    //       .POSTGRES_ROTATION_MULTI_USER,
    //   secret: secret, // The secret that will be rotated
    //   masterSecret: mastersecret, // The secret used for the rotation
    //   target: db,
    //   vpc: defaultVPC,
    //   automaticallyAfter: cdk.Duration.days(30)
    // });
  }
}
