import {
  uploadFile,
  awsResponse,
  downloadFile,
  downloadImageWithURL,
  awsImageResponse,
  //   deleteFile,
} from '../utils/imageS3';

export const createBookResolver = async (req: any, res: any) => {
  const imagePath: any = [];
  for (let i = 0; i < req.files.length; i++) {
    const { response, error } = await awsResponse(uploadFile(req.files[i]));
    if (error) {
      if (i === 0) res.status(400).send('failed to upload image 1');
      //   const { response } = await awsResponse(deleteFile(imagePath[0].Key));
      //   if (response) res.status(400).send('failed to upload image');
    }
    imagePath.push(response.Key);
  }
  console.log('imagepush', imagePath);
  // const data = await Book.create({ ...req.body, imagePath });
  res.status(200).send({ path: imagePath });
};

export const getImageResolverBase64Response = async (req: any, res: any) => {
  const { imgKey } = req.body;
  console.log('imgKey', imgKey);
  const { response } = await awsResponse(downloadFile(imgKey));
  console.log('imageData', Buffer.from(response.Body, 'base64'));
  if (!response) res.status(400);
  res.status(200).send({ imgPath: response.Body.toString('base64') });
};

export const getImageResolverWithUrlReponse = async (req: any, res: any) => {
  const { imgKey } = req.body;
  const data = await awsImageResponse(downloadImageWithURL(imgKey));
  console.log('data >>', data);
  res.status(200).send({ imgPath: data });
};
