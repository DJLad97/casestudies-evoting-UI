import React, { Component } from 'react';
import axios from 'axios';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
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
        }
    }

    componentDidMount(){
        const headers = {
            headers: {
                'x-access-token': auth.getToken()
            }
        }
        const userInfo = auth.getUserInfo();
        const endpoint = userInfo.expectedEndpoint;
        // console.log(axios.defaults.headers);
        axios.get(endpoint + '/elections/current', headers)
            .then((res) => {
                // console.log(res);
                this.setState({currentElections: res.data, loading: false});

            })
        console.log(auth.getUserInfo());
    }

    renderElections = () => {
        return this.state.currentElections.map((election, index) => {
            const formattedName = election.electionName.toLowerCase().replace(/-/g, '').replace(/ /g, '-');
            return (
                <Link key={index} to={{pathname: `/election/${formattedName}`, state: {election} }}>
                    <ElectionLink name={election.electionName}/>
                </Link>
            )
        })
    }

    render() {
        return (
            <div className="page-content-box elections-list">
                <h3 id="elections-list-header">Please choose the election you wish to vote in</h3>
                <Row>
                    { this.renderElections() }
                    <Col md={{ span: 8, offset: 2}}>
                        { (this.state.loading) && <div className="lds-dual-ring"></div>}
                    </Col>
                </Row>

            </div>
        );
    }
}


export default ElectionsList;