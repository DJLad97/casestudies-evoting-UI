import jwt_decode from "jwt-decode";
import isEmpty from "is-empty";
import axios from "axios";

/*
 *
 *
 * Auth.js implements all security functions of the program and is the
 * Go between of the API and UI, it implements multiple JWTToken based
 * Security options, we pass two JWT tokens, one containing all user data
 * And another as an encrypted constituency token
 *
 * At the bottom of this class, we have a singleton instance of this class, that can access all functions
 * That are defined in this file
 *
 */

const TOKEN_KEY = "jwtToken";
const CONS_TOKEN_KEY = "secondjwtToken";

/*
 *
 * Initialized JWT Tokens
 *
 */
const AuthClass = {
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    this.setRequestHeader(token);
  },

  setConstiuencyToken(token) {
    localStorage.setItem(CONS_TOKEN_KEY, token);
    this.setConstieuencyRequestHeader(token);
  },

  /*
   *
   * setRequestHeader resets the value of the x-access-token header value used in axios in order to
   * get information from the api for this users access rights
   *
   */
  setRequestHeader(token) {
    if (token) {
      axios.defaults.headers.common["x-access-token"] = token;
      // axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common["x-access-token"];
    }
  },

  /*
   *
   * setConstieuencyRequestHeader resets the value of the x-access-token2 header value used in axios in order to
   * get information from the api for this users current constituency
   *
   */
  setConstieuencyRequestHeader(token) {
    if (token) {
      axios.defaults.headers.common["x-access-token2"] = token;
      // axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common["x-access-token2"];
    }
  },

  /*
   *
   *
   *  retrieves the x-access-token value from local storage
   *
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /*
   *
   *
   *  retrieves the x-access-token2 value from local storage
   *
   */
  getConsToken() {
    return localStorage.getItem(CONS_TOKEN_KEY);
  },

  /*
   *
   *
   * decodes the x-access-token and returns a JSON object
   *
   */
  getUserInfo() {
    const token = AuthClass.getToken();
    return jwt_decode(token);
  },

  /*
   *
   *
   * decodes the x-access-token and returns only the expectedEndpoint property
   *
   */
  getUserEndpoint() {
    const token = AuthClass.getToken();
    const userInfo = jwt_decode(token);
    return userInfo.expectedEndpoint;
  },

  /*
   *
   *
   * destroys the current tokens and removes the current headers from axios
   *
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CONS_TOKEN_KEY);
    AuthClass.setRequestHeader(false);
    AuthClass.setConstieuencyRequestHeader(false);
    // this.isAuthenticated = false;
  },

  /*
   *
   *
   * Checks whether or not the user is logged in or not by attempting to decode the current x-access-token
   *
   */
  isAuthenticated() {
    const token = AuthClass.getToken();

    if (token) {
      const decoded = jwt_decode(AuthClass.getToken());
      if (!isEmpty(decoded)) {
        return true;
      }
    }
    return false;
  }
};

/*
 *
 *
 * Auth implements the singleton design pattern, as we should only be authenticating with one client object at a time,
 * We need to make sure that there is no possible way for the authentication to get confused as it would introduce a possible security flaw
 * Into an otherwise tight system
 *
 */
var Auth = (function() {
  var instance;

  function createInstance() {
    let ins = AuthClass;
    return ins;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

export default Auth;
