import React, { Component } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import isEmpty from "is-empty";
import PubSub from "pubsub-js";
import { withTranslation } from "react-i18next";

import ModalClass from "../ModalClass";
import auth from "../../utils/auth";

import "../../styles/election-vote.css";

class FirstPastThePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: props.election,
      selectedCandidate: "",
      error: "",
      showModal: false,
      focusClass: "candidate"
    };
  }

  handleChange = e => {
    this.setState({ selectedCandidate: e.target.value });
    this.setState({ error: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { t } = this.props;
    if (isEmpty(this.state.selectedCandidate)) {
      this.setState({ error: t("selectCandidate") });
    } else {
      this.setState({ error: "", showModal: true });
    }
  };

  onVoteFocus = () => {
    this.setState({ focusClass: "candidate vote-focus" });
  };

  onVoteBlur = () => {
    this.setState({ focusClass: "candidate" });
  };

  renderCandidates = () => {
    return this.state.election.candidates.map((candidate, index) => {
      return (
        <Col className="candidate-col" md={{ span: 8, offset: 2 }} key={index}>
          <div className="candidate">
            <label className="radio-container">
              <img
                src={candidate.candidatePicture}
                alt={candidate.party}
                className="candidate-image"
                height="70"
                width="70"
              />

              <p className="candidate-title">
                <strong>{candidate.candidateName}</strong>
                <br />
                {candidate.party}
              </p>
              <input
                type="radio"
                checked={this.state.selectedCandidate === candidate.candidateId}
                value={candidate.candidateId}
                onChange={this.handleChange}
                name="vote"
                className="radio-vote"
                aria-label={"Vote for " + candidate.candidateName}
                onFocus={this.onVoteFocus}
                onBlur={this.onVoteBlur}
              />
              <span className="checkmark" />
            </label>
          </div>
        </Col>
      );
    });
  };

  spoilBtn = async () => {
    const endpoint = auth.getInstance().getUserEndpoint();
    const headers = {
      headers: {
        "x-access-token": auth.getInstance().getToken(),
        "x-access-token2": auth.getInstance().getConsToken()
      }
    };
    let voteInfo = {
      electionId: this.state.election._id,
      candidateId: this.state.selectedCandidate,
      consistuency: auth.getInstance().getUserInfo().constiuenecyId
    };

    await axios.post(endpoint + "/elections/spoil", voteInfo, headers);

    PubSub.publish(
      "navigation",
      "/vote-confirmed/" + this.state.election.electionName
    );

    console.log("done");
  };

  confirmVote = async () => {
    let voteInfo = {
      electionId: this.state.election._id,
      candidateId: this.state.selectedCandidate,
      consistuency: auth.getInstance().getUserInfo().constiuenecyId
    };

    const endpoint = auth.getInstance().getUserEndpoint();
    const headers = {
      headers: {
        "x-access-token": auth.getInstance().getToken(),
        "x-access-token2": auth.getInstance().getConsToken()
      }
    };

    await axios.post(endpoint + "/elections/vote", voteInfo, headers);
    PubSub.publish(
      "navigation",
      "/vote-confirmed/" + this.state.election.electionName
    );
    console.log("Done");
  };

  render() {
    // console.log(props.election)
    const { t } = this.props;
    return (
      <div>
        <div className="page-content-box">
          <Button
            aria-label="Back to elections page"
            variant="info"
            className="ui-btn"
            onClick={() => PubSub.publish("navigation", "/elections/")}
          >
            <span aria-hidden="true">&#8592;&nbsp;</span>
            {t("back")}
          </Button>
          <h2 id="election-name">{this.state.election.electionName}</h2>
          <h4 id="instructions">
            {t("fptpDescLine1")}
            <br />
            {t("fptpDescLine2")}
          </h4>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                {!isEmpty(this.state.error) && (
                  <Alert variant="danger">{this.state.error}</Alert>
                )}
              </Col>
              {this.renderCandidates()}
              <Col md={{ span: 8, offset: 2 }}>
                <Button
                  name="btnSubmit"
                  aria-label="Submit vote"
                  variant="primary"
                  size="lg"
                  className="submit-vote ui-btn"
                  type="submit"
                  block
                >
                  {t("submitVote")}
                </Button>
              </Col>
            </Row>
            <Button
              name="btnSpoil"
              aria-label="Spoil Ballot"
              variant="warning"
              onClick={this.spoilBtn}
              className="spoil-btn ui-btn"
            >
              {t("spoilBallot")}
            </Button>
          </Form>
        </div>
        <ModalClass
          aria-label={"Confirm vote for " + this.state.selectedCandidate}
          header={t("confirmVote")}
          closeBtn={t("no")}
          confirmBtn={t("yes")}
          show={this.state.showModal}
          handleConfirm={this.confirmVote}
          handleClose={() => this.setState({ showModal: false })}
        >
          <p
            aria-label={"Confirm vote for " + this.state.selectedCandidate}
            className="modal-body"
          >
            {/* You have selected to vote for:  */}
            {t("voteSelect")}
            <br />
            <strong>{this.state.selectedCandidate}</strong>
            <br />
            <br />
            {/* Is this your choice? */}
            {t("voteFinalise")}
          </p>
        </ModalClass>
      </div>
    );
  }
}

export default withTranslation()(FirstPastThePost);
