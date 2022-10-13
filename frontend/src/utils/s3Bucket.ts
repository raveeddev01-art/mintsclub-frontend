import { ENV } from '../config/config';
import ReactS3Client from 'react-aws-s3-typescript';
const { awsAccessKeyId, awsAccessSecretKey, awsS3Bucket }: any = ENV;
const config = {
	bucketName: awsS3Bucket,
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsAccessSecretKey,
	region: 'us-east-2',
};
const s3 = new ReactS3Client(config);
export const uploadToS3Bucket = async (blob: any, filename: any) => {
	const res = await s3.uploadFile(blob, filename);
	return res;
};
