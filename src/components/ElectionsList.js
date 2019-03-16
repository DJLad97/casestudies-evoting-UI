import React, { Component } from 'react';
import axios from 'axios';
import { Row, Button, Col }  from 'react-bootstrap';
import { Link } from 'react-router-dom';

import auth from '../utils/auth';
import ElectionLink from './ElectionLink';

import '../styles/elections-list.css';

class ElectionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentElections: [],
			loading: true
		};
	}

	componentDidMount() {
		const headers = {
			headers: {
			"x-access-token": auth.getInstance().getToken()
			}
		};
		// console.log(axios.defaults.headers);
		axios
			.get(
			"http://evoting-voting2-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com/elections/current",
			headers
			)
			.then(res => {
			// console.log(res);
			this.setState({ currentElections: res.data, loading: false });
			});
		// console.log(auth.getInstance().getUserInfo());
	}

	renderElections = () => {
		return this.state.currentElections.map((election, index) => {
			const formattedName = election.electionName
			.toLowerCase()
			.replace(/-/g, "")
			.replace(/ /g, "-");
			return (
			<React.Fragment key={index}>
				<Link
				key={index}
				to={{ pathname: `/election/${formattedName}`, state: { election } }}
				>
				<ElectionLink name={election.electionName} />
				</Link>

				<Button className="AsAuditor" variant="outline-dark">
				<Link
					key={index}
					to={{ pathname: `/audit/${formattedName}`, state: { election } }}
				>
					{" "}
					View as Auditor
				</Link>
				</Button>
			</React.Fragment>
			);
		});
	};

	render() {
	return (
		<div className="page-content-box elections-list">
			<h3 id="elections-list-header">
				Please choose the election you wish to vote in
			</h3>
			<Row>
				{this.renderElections()}
				<Col md={{ span: 8, offset: 2 }}>
					{this.state.loading && <div className="lds-dual-ring" />}
				</Col>
			</Row>
		</div>
	);
	}
}

export default ElectionsList;
