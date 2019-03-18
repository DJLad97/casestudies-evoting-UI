import axios from 'axios';

class UserAPIClass {

    constructor() {
        this.BASEURL = "http://evoting-endpoint-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com";
    }

    registerUser = function(userData) {
        return axios.post(this.BASEURL+"/users", userData)
        .then(result => {
            console.log(result);
            if (result.status)
                return {
                    success: true,
                    userCode: result.data
                };
            else 
                return {
                    success: false
                };
        })
        .catch((err) => {
            console.log(err);
            return {
                success: false
            };
        })
    }

};



//Singleton Implementation
//This ensure only one version of the API middleware can be created,
//this is useful because these are just functions that don't change and benefit
//from not duplicating across componenets
var UserAPI = (function(){

    var instance;

    function createInstance() {
        let ins = new UserAPIClass();
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

export default UserAPI;