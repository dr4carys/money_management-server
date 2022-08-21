import multer from 'multer';
// import fs from 'fs';
// import aws from 'aws-sdk';
// import multerS3 from 'multer-s3';

const fileStorageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(file);
    cb(undefined, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage: fileStorageEngine });
