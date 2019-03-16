import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import RegisterModalButton from './RegisterModalButton';

import auth from '../utils/auth';

import '../styles/login.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			postCode: '',
			userCode: ''
		}
	}

	componentDidMount(){
		if(auth.getInstance().isAuthenticated()){
			PubSub.publish('navigation', '/elections');
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const loginData = {
			postCode: this.state.postCode.replace(/\s/g,'').toLowerCase(),
			userCode: this.state.userCode
		}
		axios.post('http://evoting-endpoint-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com/users/login', loginData)
			.then((res) => {
				const token = res.data;
				auth.getInstance().setToken(token);
				PubSub.publish('navigation', '/elections');
			})
			.catch((err) => {
				console.log(err);
			})
	}
	
	render() {
		return (
			<div id="login-container">
				<Row>
					<Col md={{ span: 8, offset: 2}}>
						<div className="page-content-box">
							<h1>Login</h1>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="formBasicPostcode">
									<Form.Label>
										Please enter the postcode (or your country's equivalent) you registered with:
									</Form.Label>
									<Form.Control type="text" placeholder="Post Code" 
										name="postCode" onChange={this.onChange} 
										value={this.state.postCode} required/>
								</Form.Group>

								<Form.Group controlId="formBasicVotingCode">
									<Form.Label>
										Please enter your unique voting code you received in the mail:
									</Form.Label>
									<Form.Control type="text" placeholder="Voting Code" 
										name="userCode" onChange={this.onChange}
										value={this.state.userCode} required />
								</Form.Group>
								<Button variant="primary" type="submit">
									Log In
								</Button>
							</Form>

							<RegisterModalButton/>

						</div>
					</Col>
				</Row>
			</div>
		)
	}
}
