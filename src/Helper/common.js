import ReactS3Client from "react-aws-s3-typescript";

const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  s3Url: process.env.REACT_APP_S3_URL
};
export const fileUpload = async (file) => {
  const s3 = new ReactS3Client(s3Config);
  try {
    const { location } = await s3.uploadFile(file);
    return location;
  } catch (exception) {
    console.log(exception);
  }
};
