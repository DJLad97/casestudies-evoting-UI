import React, { Component } from 'react';
import
 { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import isEmpty from 'is-empty';

import ModalClass from '../ModalClass';
import auth from '../../utils/auth';
class StvPvVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: props.election,
            // election: this.props.location.state.election,
            candidates: this.initCandidates(),
            votes: [],
            error: '',
            showModal: false
        }
    }

    initCandidates = () => {
        let candidates = this.props.election.candidates;
        candidates.forEach((candidate) => {
            candidate.votedFor = false;
        });

        return candidates;
    }

    handleSubmit = (e) => {
       
    } 

    renderCandidates = () => {
		return this.state.candidates.map((candidate, id) => {
            let button = '';
            if(!candidate.votedFor){
                button = (<Button variant="primary" onClick={() => this.addToVote(candidate, id)}>Add</Button>);
            }
            else {
                button = (<Button variant="primary" onClick={() => this.removeFromVote(candidate, id)}>Remove</Button>);
            }
			return (
				<div key={id}>
					{button}
					<p>
						{candidate.candidateName}
						<br/>
						{candidate.party}
					</p>
				</div>
			)
		});
	}

	renderVotes = () => {
		return this.state.votes.map((candidate, id) => {
			return (
				<div key={id}>
                    <h5>{id + 1}</h5>
					{/* <Button variant="primary" onClick={() => this.removeFromVote(candidate.candidateName, id)}>Remove</Button> */}
					<p>
						{candidate.candidateName}
						<br/>
						{candidate.party}
					</p>
				</div>
			)
			// <div key={id}><Button variant="primary" onClick={() => this.removeFromVote(candidate, id)}>{candidate}</Button><br/></div>
		});
	}

	addToVote = (candidate, id) => {
        // alert(id);
		let votes = this.state.votes;
		let candidates = this.state.candidates;
        votes.push(this.state.candidates[id]);
        candidates[id].votedFor = true;
		// let index = candidates.inde
		// if (id > -1) {
		// 	candidates.splice(id, 1);
		// }
		
		this.setState({votes, candidates});
	}

	removeFromVote = (candidate, id) => {
        // alert(id);
		let votes = this.state.votes;
		let candidates = this.state.candidates;
        // candidates.push(this.state.votes[id]);
        candidates[id].votedFor = false;
        
		// let index = votes.indexOf(candidate);
		// if (id > -1) {
		// 	votes.splice(id, 1);
        // }
        votes = votes.filter(function( obj ) {
            return obj._id !== candidate._id;
        });
		
		this.setState({votes, candidates});
	}

    confirmVote = () => {

    }
    render() {
        // console.log(props.election)
        console.log(this.state.votes);

        return (
            <div>
                <div className="page-content-box">
                    <h2 id="election-name">{this.state.election.electionName}</h2>
                    <p id="instructions">
                        To rank a candidate, click the add button next to that candidate.
                        <br/>
                        The first candidate you add will be put to rank 1
                        <br/>
                        The second candidate you will put to rank 2 and so on
                        <br/>
                        If you remove a canidate, all the candidates below will be moved up a rank
                    </p>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            {/* <Col md={{ span: 8, offset: 2}}>
                                {
                                    (!isEmpty(this.state.error)) && 
                                    <Alert variant="danger">
                                        {this.state.error}
                                    </Alert>
                                }
                            </Col> */}
                            <Col md={2}></Col>
                            <Col md={4}>
                                {this.renderCandidates()}
                            </Col>
                            <Col md={4}>
                                {this.renderVotes()}
                            </Col>
                            <Col md={{ span: 8, offset: 2}}>
                                <Button variant="primary" size="lg" className="submit-vote" type="submit" block>
                                    Submit Vote
                                </Button>
                            </Col>
                            <Col md={2}></Col>
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

export default StvPvVote;