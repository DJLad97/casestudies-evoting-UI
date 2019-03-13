import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios'
import auth from '../utils/auth';
import '../styles/login.css'

export default class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			postCode: '',
			userCode: ''
		}
	}

	componentDidMount(){
		if(auth.isAuthenticated()){
			this.props.history.push('/elections');
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const loginData = {
			postCode: this.state.postCode,
			userCode: this.state.userCode
		}
		axios.post('http://evoting-endpoint-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com/users/login', loginData)
			.then((res) => {
				const token = res.data;
				auth.setToken(token);
				this.props.history.push('/elections');
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
								<Form.Group controlId="formBasicEmail">
									<Form.Label>
										Please enter the postcode (or your country's equivalent) you registered with:
									</Form.Label>
									<Form.Control type="text" placeholder="Post Code" 
										name="postCode" onChange={this.onChange} 
										value={this.state.postCode} />
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>
										Please enter your unique voting code you received in the mail:
									</Form.Label>
									<Form.Control type="text" placeholder="Voting Code" 
										name="userCode" onChange={this.onChange}
										value={this.state.userCode} />
								</Form.Group>
								<Button variant="primary" type="submit">
									Log In
								</Button>
							</Form>

						</div>
					</Col>
				</Row>
			</div>
		)
	}
}
