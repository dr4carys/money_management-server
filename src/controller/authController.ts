// const AwsConfig = require('./../lib/AwsConfig');
import { awsResponse, cognitoSignUpInvited, cognitoSignUpThemSelf, verifyToken,verifySignIn } from '../utils/cognitoConfig';

// function signUp(email, password, agent = 'none') {
//   return new Promise((resolve) => {
//     AwsConfig.initAWS ();
//     AwsConfig.setCognitoAttributeList(email,agent);
//     AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, function(err, result){
//       if (err) {
//         return resolve({ statusCode: 422, response: err });
//       }
//       const response = {
//         username: result.user.username,
//         userConfirmed: result.userConfirmed,
//         userAgent: result.user.client.userAgent,
//       }
//         return resolve({ statusCode: 201, response: response });
//       });
//     });
// }

// const phoneChecker = /^\d{10}$/;
const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const signUpInvited = async (req: any, res: any) => {
  const { email, password, username, firstName, lastName } = req.body;
  const { error } = await awsResponse(cognitoSignUpInvited(username, firstName, lastName, email, password));
  if (error) {
    console.log('err >>', error);
    res.status(400).send({ body: error });
  }
  res.status(200).send({ body: 'successfully sign up data' });
};

export const signUp = async (req: any, res: any) => {
  const { name, email, phone_number, address, password } = req.body;
  if (!emailChecker.test(email)) res.status(400).send({ body: 'please check your email address' });
  try {
    await cognitoSignUpThemSelf(name, email, phone_number, address, password);
  } catch (e) {
    console.log('e >>', e);
    res.status(400).send({ body: e });
  }
  res.status(200).send({ body: 'successfully sign up data' });
};

export const verifyUser = async (req: any, res: any) => {
  const { code, email } = req.body;
  try {
    await verifyToken(email, code);
  } catch (e) {
    console.log('e >>', e);
    res.status(400).send({ body: e });
  }
  res.status(200).send({ body: ' email succesfully been verfied' });
};

export const signInUser =async (req:any, res: any) => {
  const { email , password } = req.body;
  try{
    await verifySignIn(email, password)
  }catch (e) {
    console.log('e >>')
    res.status(400).send({ body : e})
  }
  res.status(200)
}
// function verify(email, code) {
//   return new Promise((resolve) => {
//     AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
//       if (err) {
//         return resolve({ statusCode: 422, response: err });
//       }
//       return resolve({ statusCode: 400, response: result });
//     });
//   });
// }

// function signIn(email, password) {
//   return new Promise((resolve) => {
//     AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
//       onSuccess: (result) => {
//         const token = {
//           accessToken: result.getAccessToken().getJwtToken(),
//           idToken: result.getIdToken().getJwtToken(),
//           refreshToken: result.getRefreshToken().getToken(),
//         }
//         return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
//       },

//       onFailure: (err) => {
//         return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
//       },
//     });
//   });
// }

// module.exports = {
//     signUp,
//     verify,
//     signIn
// }
