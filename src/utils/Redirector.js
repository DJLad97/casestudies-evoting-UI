import React, { Component } from 'react';

import {
    withRouter
  } from 'react-router-dom'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PubSub from 'pubsub-js';

class Redirector extends Component {
	constructor(props) {
		super(props);

		this.navigateTo = this.navigateTo.bind(this);

		let token = PubSub.subscribe('navigation', this.navigateTo);
    }
    
    navigateTo(msg, data) {
      console.log(data);
		  this.props.history.push(data);
    }
    
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default withRouter(Redirector);