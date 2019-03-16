import jwt_decode from 'jwt-decode';
import isEmpty from 'is-empty';
import axios from 'axios';

const TOKEN_KEY = 'jwtToken';

const AuthClass = { 
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        this.setRequestHeader(token);
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

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    getUserInfo() {
        const token = AuthClass.getToken();
        return jwt_decode(token);
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        AuthClass.setRequestHeader(false);
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