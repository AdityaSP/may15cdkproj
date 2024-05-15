#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FirstprojStack } from '../lib/firstproj-stack';

const app = new cdk.App();


new FirstprojStack(app, 'FirstprojStackAdi', {});