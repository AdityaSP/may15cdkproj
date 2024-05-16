#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FirstprojStack } from '../lib/firstproj-stack';
import { WebsiteDeploymentStack } from '../lib/websitedeploy-stack';

const app = new cdk.App();


const s1 = new FirstprojStack(app, 'FirstprojStackAdi', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
})

const s2 = new WebsiteDeploymentStack(app, "WebsiteAdi", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
});

s2.addDependency(s1)

