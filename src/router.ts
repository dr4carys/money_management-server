import express from 'express';
import { upload } from './utils/imageProcessing';
import { getRecipe, insertRecipe, insertIngredient, insertStep } from './controller/flashcoffeController';
import { argchecker } from './middlewares/argumentchecker';
import { signUp, signUpInvited, verifyUser } from './controller/authController';
import {
  createBookResolver,
  getImageResolverBase64Response,
  getImageResolverWithUrlReponse,
} from './controller/imageController';

const router = express.Router();

router.post('/insertStep', argchecker, insertStep);
router.post('/insertIngredient', argchecker, insertIngredient);
router.post('/insertRecipe', argchecker, insertRecipe);
router.get('/getRecipe', getRecipe);
router.post('/postImage', upload.array('images'), createBookResolver);
router.post('/getImage', getImageResolverBase64Response);
router.post('/getImageURL', getImageResolverWithUrlReponse);
router.post('/me/signup', signUp);
router.post('/me/signUpByInvited', signUpInvited);
router.post('/me/verifyUser', verifyUser);

export = router;
