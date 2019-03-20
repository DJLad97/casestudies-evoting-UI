import React, { Component } from 'react';
import
 { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import isEmpty from 'is-empty';
import PubSub from 'pubsub-js';
import { withTranslation } from 'react-i18next';

import ModalClass from "../ModalClass";
import auth from "../../utils/auth";

import "../../styles/stv-pv-vote.css";
class StvPvVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: props.election,
      // election: this.props.location.state.election,
      candidates: this.initCandidates(),
      votes: [],
      error: "",
      showModal: false,
      submittingVotes: false
    };
  }

  initCandidates = () => {
    let candidates = this.props.election.candidates;
    candidates.forEach(candidate => {
      candidate.votedFor = false;
    });

    return candidates;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { t } = this.props;
    if (isEmpty(this.state.votes)) {
      this.setState({error: t('selectCandidateStvPv')});

      return;
    } else {
      this.setState({ error: "", showModal: true });
    }
  };

  renderCandidates = () => {
    const { t } = this.props;
    return this.state.candidates.map((candidate, id) => {
      let button = "";
      if (!candidate.votedFor) {
        button = (
          <Button
            name="btnAdd"
            className="add-remove-btn"
            variant="info"
            onClick={() => this.addToVote(candidate, id)}
          >
            {t('add')}
          </Button>
        );
      } else {
        button = (
          <Button
            name="btnRemove"
            className="add-remove-btn"
            variant="danger"
            onClick={() => this.removeFromVote(candidate, id)}
          >
            {t('remove')}
          </Button>
        );
      }
      return (
        <div className="candidate-container" key={id}>
          {button}
          <p className="candidate-text">
            {candidate.candidateName}
            <br />
            {candidate.party}
          </p>
          <img
            src={candidate.candidatePicture}
            alt={candidate.party}
            className="candidate-image"
            height="60"
            width="60"
          />
        </div>
      );
    });
  };

  renderVotes = () => {
    return this.state.votes.map((candidate, id) => {
      return (
        <div className="candidate-container" key={id}>
          {/* <h5>{id + 1}</h5> */}
          {/* <Button variant="primary" onClick={() => this.removeFromVote(candidate.candidateName, id)}>Remove</Button> */}
          <p className="candidate-text vote">
            <span className="vote-num">{id + 1}.</span>
            <span className="voted-candidated">
              {candidate.candidateName}
              <br />
              {candidate.party}
            </span>
          </p>
          <img
            src={candidate.candidatePicture}
            alt={candidate.party}
            className="candidate-image"
            height="60"
            width="60"
          />
        </div>
      );
    });
  };

  addToVote = (candidate, id) => {
    let votes = this.state.votes;
    let candidates = this.state.candidates;
    votes.push(this.state.candidates[id]);
    candidates[id].votedFor = true;

    this.setState({ votes, candidates });
  };

  removeFromVote = (candidate, id) => {
    let votes = this.state.votes;
    let candidates = this.state.candidates;
    candidates[id].votedFor = false;

    votes = votes.filter(function(obj) {
      return obj._id !== candidate._id;
    });

    this.setState({ votes, candidates });
  };

  confirmVote = async () => {
    // const maxVotes = this.state.candidates.length
    let voteCount = this.state.candidates.length;
    this.setState({ submittingVotes: true });
    const endpoint = auth.getInstance().getUserEndpoint();
    const headers = {
      headers: {
        "x-access-token": auth.getInstance().getToken(),
        "x-access-token2": auth.getInstance().getConsToken()
      }
    };

    let votes = this.state.votes;

    for (let i = 0; i < votes.length; i++) {
      let vote = votes[i];
      console.log(`Started placing votes for ${vote.candidateName}`);
      let voteInfo = {
        electionId: this.state.election._id,
        candidateId: vote.candidateId,
        consistuency: auth.getInstance().getUserInfo().constiuenecyId
      };

      for (let i = 0; i < voteCount; i++) {
        console.log(i + 1 + " vote for " + vote.candidateName);
        await axios.post(endpoint + "/elections/vote", voteInfo, headers);
        console.log(`${i + 1} votes for ${vote.candidateName}`);
      }

      voteCount -= 1;
    }
    this.setState({ error: "" });
    this.setState({ submittingVotes: false });

    await axios.get(
      endpoint + "/elections/" + this.state.election._id + "/markAsVoted",
      headers
    );
    PubSub.publish(
      "navigation",
      "/vote-confirmed/" + this.state.election.electionName
    );
  };
  
  render() {
    const { t } = this.props;
    return (
        <div>
            <div className="page-content-box">
                <Button variant="info" onClick={() => PubSub.publish('navigation', '/elections/')}>&#8592;&nbsp;{t('back')}</Button>
                <h2 id="election-name">{this.state.election.electionName}</h2>
                <p id="instructions">
                    {/* To rank a candidate, click the add button next to that candidate. */}
                    {t('stvPvDescLine1')}
                    <br/>
                    {/* The first candidate you add will be put to rank 1 */}
                    {t('stvPvDescLine2')}
                    <br/>
                    {/* The second candidate you will put to rank 2 and so on */}
                    {t('stvPvDescLine3')}
                    <br/>
                    {/* If you remove a canidate, all the candidates below will be moved up a rank */}
                    {t('stvPvDescLine4')}
                </p>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={{ span: 8, offset: 2}}>
                            {
                                (!isEmpty(this.state.error)) && 
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            }
                        </Col>
                        {/* <Col md={{ span: 8, offset: 2}}>
                            {
                                (!isEmpty(this.state.error)) && 
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            }
                        </Col> */}
                        {/* <Col md={2}></Col> */}
                        <Col md={4}>
                            <h3 className="candidate-header">{t('candidates')}</h3>
                            {this.renderCandidates()}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <h3 className="candidate-header">{t('votes')}</h3>
                            {this.renderVotes()}
                        </Col>
                        <Col md={{ span: 8, offset: 2}}>
                            <Button variant="primary" size="lg" className="submit-vote" type="submit" block>
                            {t('submitVote')}
                            </Button>
                        </Col>
                        {/* <Col md={2}></Col> */}
                    </Row>
                    <Button variant="warning" className="spoil-btn">{t('spoilBallot')}</Button>
                </Form>
            </div>
            <ModalClass header={t('confirmVote')} closeBtn={t('no')} confirmBtn={t('yes')} 
                        show={this.state.showModal} handleConfirm={this.confirmVote} 
                        handleClose={() => this.setState({showModal: false})}>
                <p className="modal-body">
                    {this.state.submittingVotes && <span><span>Submitting Votes</span><br/><span className="lds-dual-ring"/></span>}
                    {!this.state.submittingVotes && (
                        <span>
                            {/* Your selected votes are as followed:  */}
                            {t('voteSelectStvPv')}
                            <br/>
                            <br/>
                            {this.state.votes.map((vote, index) => {
                                return <span key={index}><strong>{index + 1}.</strong>&nbsp;{vote.candidateName}<br/></span>
                            })}
                            <br/>
                            {t('voteFinaliseStvPv')}
                            {/* Are these your choices? */}
                        </span>
                    )}
                </p>
            </ModalClass>
        </div>
    );
}
}

export default withTranslation()(StvPvVote);
