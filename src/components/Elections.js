import React, { Component } from 'react';
import auth from '../utils/auth';

class Elections extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        console.log(auth.getUserInfo());
    }

    render() {
        return (
            <div className="page-content-box">
                <h1>Elections list</h1>
            </div>
        );
    }
}

export default Elections;