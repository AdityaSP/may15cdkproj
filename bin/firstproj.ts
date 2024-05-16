#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FirstprojStack } from '../lib/firstproj-stack';

const app = new cdk.App();

// console.log(process.env)

new FirstprojStack(app, 'FirstprojStackAdi', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});