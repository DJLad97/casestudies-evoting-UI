import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common['x-access-token'] = token;
    }
    else{ 
        delete axios.defaults.headers.common['x-access-token'];
    }
};

const setlocalConstiuencyToken = (token) => {
    if(token) {
        axios.defaults.headers.common['x-access-token2'] = token;
    }
    else{ 
        delete axios.defaults.headers.common['x-access-token2'];
    }
}

export default setAuthToken;