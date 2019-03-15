import jwt_decode from 'jwt-decode';
import isEmpty from 'is-empty';
import axios from 'axios';

const TOKEN_KEY = 'jwtToken';

const auth = { 
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
        const token = auth.getToken();
        return jwt_decode(token);
    },

    getUserEndpoint() {
        const token = auth.getToken();
        const userInfo = jwt_decode(token);
        return userInfo.expectedEndpoint;
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        auth.setRequestHeader(false);
        // this.isAuthenticated = false;
    },

    isAuthenticated() {
        const token = auth.getToken();

        if(token){
            const decoded = jwt_decode(auth.getToken());
            if(!isEmpty(decoded)){
                return true;
            }
        }
        return false;
    }
}

export default auth;