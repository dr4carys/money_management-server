import jwtDecode from 'jwt-decode';
import { CognitoUserAttribute, CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { config, CognitoIdentityCredentials } from 'aws-sdk';

let cognitoAttributeList = [];
const poolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};

const attributes = (key: any, value :any) => {
  return {
    Name: key,
    Value: value,
  };
};

export const setCognitoAttributeList = (email, agent) => {
  let attributeList = [];
  attributeList.push(attributes('email', email));
  attributeList.forEach((element) => {
    cognitoAttributeList.push(new CognitoUserAttribute(element));
  });
  s;
};

export const getCognitoAttributeList = () => {
  return cognitoAttributeList;
};

export const getCognitoUser = (email) => {
  const userData = {
    Username: email,
    Pool: getUserPool(),
  };
  return new CognitoUser(userData);
};

const getUserPool = () => {
  return new CognitoUserPool(poolData);
};

export const getAuthDetails = (email, password) => {
  var authenticationData = {
    Username: email,
    Password: password,
  };
  return new AuthenticationDetails(authenticationData);
};

export const initAWS = (
  region = process.env.AWS_COGNITO_REGION,
  identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID
) => {
  config.region = region; // Region
  config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  });
};

export const decodeJWTToken = (token) => {
  const { email, exp, auth_time, token_use, sub } = <any>jwtDecode(token.idToken);
  return { token, email, exp, uid: sub, auth_time, token_use };
};
