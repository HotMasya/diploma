// API
import API from 'API';

// Helpers
import { getParamsFromHash } from 'Helpers/getParamsFromHash';
import { removeLocationHash } from 'Helpers/removeLocationHash';

export async function checkGoogleLogin() {
  const params = getParamsFromHash();

  if (params.access_token) {
    removeLocationHash();

    const { accessToken } = await API.Auth.loginWithGoogle({ accessToken: params.access_token });

    return accessToken;
  }

  return Promise.reject();
}
