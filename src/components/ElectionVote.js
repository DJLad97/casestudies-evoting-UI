import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import isEmpty from 'is-empty';

import ModalClass from './ModalClass';
import auth from '../utils/auth';

import '../styles/election-vote.css';

class ElectionVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: this.props.location.state.election,
            selectedCandidate: '',
            error: '',
            showModal: false
        }
    }
    
    handleChange = (e) => {
        this.setState({selectedCandidate: e.target.value});
        this.setState({error: ''});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(this.state.selectedCandidate)){
            this.setState({error: 'Please Select a Candidate!'});
        }
        else{
            this.setState({error: '', showModal: true});
        }
    } 

    renderCandidates = () => {
        return this.state.election.candidates.map((candidate, index) => {
            return (
                <Col md={{ span: 8, offset: 2}} key={index}>
                    <div className="candidate">
                        {/* <input type="radio" className="candidate" name="vote" id={candidate.candidateName}/>
                        <label htmlFor={candidate.candidateName}>
                            {candidate.candidateName}<br/>
                            {candidate.party}
                        </label> */}
                        <label className="radio-container">
                            <p className="candidate-title">
                                <strong>{candidate.candidateName}</strong>
                                <br/>
                                {candidate.party}
                            </p>
                            <input type="radio" checked={this.state.selectedCandidate === candidate.candidateId} 
                                value={candidate.candidateId} onChange={this.handleChange} name="vote"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </Col>
            )
        })
    }

    confirmVote = () => {
        let voteInfo = {
            electionId: this.state.election._id,
            candidateId: this.state.selectedCandidate,
            consistuency: 'South Sheffield'
        }

        const endpoint = auth.getUserEndpoint();
        const headers = {
            headers: {
                'x-access-token': auth.getToken()
            }
        }
        axios.post(endpoint + '/elections/vote', voteInfo, headers)
            .then((res) => {
                axios.get(endpoint + '/elections/' + this.state.election._id + '/markAsVoted', headers)
                .then((res) => {
                        this.props.history.push({
                            pathname: '/vote-confirmed', 
                            state: {electionName: this.state.election.electionName
                        }});
                        console.log(res);
                    })
            })
            .catch((err) => {
                console.log(err);
            });

    }
    render() {
        return (
            <div>
                <div className="page-content-box">
                    <h2 id="election-name">{this.state.election.electionName}</h2>
                    <h4 id="instructions">
                        Please click on the candidate you wish to vote for
                        <br/>
                        You will only be able to choose one candidate
                    </h4>
                    {/* {this.props.location.state.} */}
                    <Form onSubmit={this.handleSubmit}>
                        {/* <input type="radio" className="candidate" name="radio3" id="jeremy"/><label htmlFor="jeremy">Jeremy</label> */}
                        {/* <input type="radio" className="candidate" name="radio3" id="theresa"/><label htmlFor="theresa">Theresa</label> */}
                        {/* <input type="radio" className="candidate" name="radio3" id="boris"/><label htmlFor="boris">Boris</label> */}
                        <Row>
                            <Col md={{ span: 8, offset: 2}}>
                                {
                                    (!isEmpty(this.state.error)) && 
                                    <Alert variant="danger">
                                        {this.state.error}
                                    </Alert>
                                }
                            </Col>
                            {this.renderCandidates()}
                            <Col md={{ span: 8, offset: 2}}>
                                <Button variant="primary" size="lg" className="submit-vote" type="submit" block>
                                    Submit Vote
                                </Button>
                            </Col>
                        </Row>
                        <Button variant="warning" className="spoil-btn">Spoil Ballot</Button>
                    </Form>
                </div>
                <ModalClass header="Confirm Vote" closeBtn="No" confirmBtn="Yes" 
                            show={this.state.showModal} handleConfirm={this.confirmVote} 
                            handleClose={() => this.setState({showModal: false})}>
                    <p className="modal-body">
                        You have selected to vote for: 
                        <br/>
                        <strong>{this.state.selectedCandidate}</strong>
                        <br/>
                        <br/>
                        Is this your choice?
                    </p>
                </ModalClass>
            </div>
        );
    }
}

export default ElectionVote;