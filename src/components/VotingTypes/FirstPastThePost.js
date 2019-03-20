import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import isEmpty from 'is-empty';
import PubSub from 'pubsub-js'
import { withTranslation } from 'react-i18next';

import ModalClass from '../ModalClass';
import auth from '../../utils/auth';

import '../../styles/election-vote.css';

class FirstPastThePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: props.election,
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
        const { t } = this.props;
        if(isEmpty(this.state.selectedCandidate)){
            this.setState({error: t('selectCandidate')});
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
                        <img src={candidate.candidatePicture} alt={candidate.party} className="candidate-image" height="70" width="70" />

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

    spoilBtn = () => {

        const endpoint = auth.getInstance().getUserEndpoint();
        const headers = {
            headers: {
                "x-access-token": auth.getInstance().getToken(),
                "x-access-token2": auth.getInstance().getConsToken()
            }
        }

        axios.get(endpoint + '/elections/' + this.state.election._id + '/markAsVoted', headers)
            .then((res) => {
                PubSub.publish('navigation', '/vote-confirmed/' + this.state.election.electionName);

                console.log(res);
        })

    }

    confirmVote = () => {
        let voteInfo = {
            electionId: this.state.election._id,
            candidateId: this.state.selectedCandidate,
            consistuency: auth.getInstance().getUserInfo().constiuenecyId
        }

        const endpoint = auth.getInstance().getUserEndpoint();
        const headers = {
            headers: {
                "x-access-token": auth.getInstance().getToken(),
                "x-access-token2": auth.getInstance().getConsToken(),
              }
        }
        
        
        axios.post(endpoint + '/elections/vote', voteInfo, headers)
            .then((res) => {
                axios.get(endpoint + '/elections/' + this.state.election._id + '/markAsVoted', headers)
                .then((res) => {
                        PubSub.publish('navigation', '/vote-confirmed/' + this.state.election.electionName);
                        console.log(res);
                    })
            })
            .catch((err) => {
                console.log(err.response);
            });

    }

    render() {
        // console.log(props.election)
        const { t } = this.props;
        return (
            <div>
                <div className="page-content-box">
                    <Button variant="info" onClick={() => PubSub.publish('navigation', '/elections/')}>&#8592;&nbsp;{t('back')}</Button>
                    <h2 id="election-name">{this.state.election.electionName}</h2>
                    <h4 id="instructions">
                        {/* Please click on the candidate you wish to vote for */}
                        {/* <br/> */}
                        {/* You will only be able to choose one candidate */}
                        {t('fptpDescLine1')}
                        <br/>
                        {t('fptpDescLine2')}
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
                                    {t('submitVote')}
                                </Button>
                            </Col>
                        </Row>
                        <Button variant="warning" onClick={this.spoilBtn} className="spoil-btn">{t('spoilBallot')}</Button>
                    </Form>
                </div>
                <ModalClass header={t('confirmVote')} closeBtn={t('no')} confirmBtn={t('yes')}
                            show={this.state.showModal} handleConfirm={this.confirmVote} 
                            handleClose={() => this.setState({showModal: false})}>
                    <p className="modal-body">
                        {/* You have selected to vote for:  */}
                        {t('voteSelect')}
                        <br/>
                        <strong>{this.state.selectedCandidate}</strong>
                        <br/>
                        <br/>
                        {/* Is this your choice? */}
                        {t('voteFinalise')}

                    </p>
                </ModalClass>
            </div>
        );
    }
}

export default withTranslation()(FirstPastThePost);