import jwtDecode from 'jwt-decode';
import { CognitoUserAttribute, CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import {
  // config,
  // CognitoIdentityCredentials,
  CognitoIdentityServiceProvider,
} from 'aws-sdk';
// import { AWS_REGION, AWS_ACCESS_ID, AWS_SECRET_KEY } from '../../config';
// import { Request } from 'aws-sdk';

// let cognitoAttributeList = [];

const userPool = new CognitoUserPool({
  UserPoolId: 'ap-southeast-1_xcpkQFFFg',
  ClientId: '7uh94025f894cs3cm7i5qcrbm8',
});
const CognitoInstance = new CognitoIdentityServiceProvider({
  accessKeyId: 'AKIAWZYISU5UNCSSGMPO',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
});

export async function awsResponse<D, E>(arg: any): Promise<{ response?: D; error?: E }> {
  try {
    return { response: await arg.promise() };
  } catch (e) {
    return { error: e as E };
  }
}

export const cognitoSignUpInvited = (
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const params = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: username,
    TemporaryPassword: 'M0n3yM4nager',
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: `${firstName} ${lastName}` },
    ],
  };
  return CognitoInstance.adminCreateUser(params);
};

export const cognitoSignUpThemSelf = (name: any, email: any, phone_number: any, address: any, password: any) => {
  const attributeList = [];
  attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
  attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
  attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phone_number }));
  attributeList.push(new CognitoUserAttribute({ Name: 'address', Value: address }));
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, undefined, function (err, result) {
      if (err) {
        return reject(err.message);
      }
      console.log('...result:', result);
      resolve(result);
    });
  });
};

export const verifyToken = (email: any, code: any) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  return new Promise((resolve, reject) => {
    new CognitoUser(userData).confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err.message);
      }
      console.log('...result:', result);
      resolve(result);
    });
  });
};

export const verifySignIn = (email: any, password: any) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  return new Promise((resolve, reject) => {
    new CognitoUser(userData).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: (result) => {
          return resolve({ statusCode: 200, response: jwtDecode(result.getIdToken().getJwtToken())});
        },
        onFailure: (err) => {
          return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
        },
      }
    );
  });
};

// const attributes = (key: any, value: any) => {
//   return {
//     Name: key,
//     Value: value,
//   };
// };

// export const setCognitoAttributeList = (email, agent) => {
//   let attributeList = [];
//   attributeList.push(attributes('email', email));
//   attributeList.forEach((element) => {
//     cognitoAttributeList.push(new CognitoUserAttribute(element));
//   });
// };

// export const getCognitoAttributeList = () => {
//   return cognitoAttributeList;
// };

// export const getCognitoUser = (email) => {
//   const userData = {
//     Username: email,
//     Pool: getUserPool(),
//   };
//   return new CognitoUser(userData);
// };

// const getUserPool = () => {
//   return new CognitoUserPool(poolData);
// };

// export const getAuthDetails = (email, password) => {
//   var authenticationData = {
//     Username: email,
//     Password: password,
//   };
//   return new AuthenticationDetails(authenticationData);
// };

// export const initAWS = (
//   region = process.env.AWS_COGNITO_REGION,
//   identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID
// ) => {
//   config.region = region; // Region
//   config.credentials = new CognitoIdentityCredentials({
//     IdentityPoolId: identityPoolId,
//   });
// };

// export const decodeJWTToken = (token) => {
//   const { email, exp, auth_time, token_use, sub } = <any>jwtDecode(token.idToken);
//   return { token, email, exp, uid: sub, auth_time, token_use };
// };
