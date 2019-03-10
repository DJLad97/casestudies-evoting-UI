import jwt_decode from 'jwt-decode';
import axios from 'axios';

const TOKEN_KEY = 'jwtToken';

const auth = { 
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        auth.setRequestHeader(token);
    },

    setRequestHeader(token) {
        if(token) {
            axios.defaults.headers.common['x-access-token'] = token;
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

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        auth.setRequestHeader(false);
    }
}

export default auth;