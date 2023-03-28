// API
import API from 'API';

class Auth {
  #rememberMe = true;
  #tokenStorageKey = 'access_token';

  get storage() {
    return this.#rememberMe ? localStorage : sessionStorage;
  }

  #token = this.storage.getItem(this.#tokenStorageKey);

  get token () {
    return this.#token;
  }

  set token(value) {
    this.#token = value;
    this.storage.setItem(this.#tokenStorageKey, value);
  }

  get rememberMe() {
    return this.#rememberMe;
  }

  set rememberMe(value) {
    this.#rememberMe = Boolean(value);
  }

  clearStorageToken() {
    this.#token = null;
    this.storage.removeItem(this.#tokenStorageKey);
  }

  logIn(token, rememberMe = true) {
    API.updateAccessToken(token);
    this.#rememberMe = rememberMe;
    this.token = token;
  }

  logOut() {
    this.#rememberMe = false;
    this.clearStorageToken();
  }
}

const authHelper = new Auth();

export default authHelper;
