const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // в .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // в .env
  region: process.env.AWS_REGION,                 // например, us-east-1
});

module.exports = s3;