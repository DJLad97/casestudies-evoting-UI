import jwt_decode from 'jwt-decode';
import isEmpty from 'is-empty';
import axios from 'axios';

const TOKEN_KEY = 'jwtToken';
const CONS_TOKEN_KEY = 'secondjwtToken';

const AuthClass = { 
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        this.setRequestHeader(token);
    },

    setConstiuencyToken(token) {
        localStorage.setItem(CONS_TOKEN_KEY, token);
        this.setConstieuencyRequestHeader(token);
    },

    setRequestHeader(token) {
        if(token) {
            axios.defaults.headers.common['x-access-token'] = token;
            // axios.defaults.headers.common['Authorization'] = token;
        }
        else{ 
            delete axios.defaults.headers.common['x-access-token'];
        }
    },

    setConstieuencyRequestHeader(token) {
        if(token) {
            axios.defaults.headers.common['x-access-token2'] = token;
            // axios.defaults.headers.common['Authorization'] = token;
        }
        else{ 
            delete axios.defaults.headers.common['x-access-token2'];
        }
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    getConsToken() {
        return localStorage.getItem(CONS_TOKEN_KEY)
    },

    getUserInfo() {
        const token = AuthClass.getToken();
        return jwt_decode(token);
    },

    getUserEndpoint() {
        const token = AuthClass.getToken();
        const userInfo = jwt_decode(token);
        return userInfo.expectedEndpoint;
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CONS_TOKEN_KEY);
        AuthClass.setRequestHeader(false);
        AuthClass.setConstieuencyRequestHeader(false);
        // this.isAuthenticated = false;
    },

    isAuthenticated() {
        const token = AuthClass.getToken();

        if(token){
            const decoded = jwt_decode(AuthClass.getToken());
            if(!isEmpty(decoded)){
                return true;
            }
        }
        return false;
    }
}





var Auth = (function(){

    var instance;

    function createInstance() {
        let ins = AuthClass;
        return ins;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();

export default Auth;