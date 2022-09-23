import { config } from 'dotenv';

config();

export const AWS_BUCKET_NAME = 'brambuckettest';
export const AWS_ACCESS_KEY = '';
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_SECRET_ACCESS_KEY = '';
export const AWS_ARN = process.env.AWS_ARN;
export const MONGODB_URL = process.env.MONGODB_URI;
export const MONGO_DEBUG = true;
