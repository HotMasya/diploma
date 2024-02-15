export const GOOGLE_OAUTH2_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export const GOOGLE_OAUTH2_OPTIONS = Object.freeze({
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
  responseType: 'token',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
});
