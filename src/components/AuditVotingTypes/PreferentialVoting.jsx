import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col"

class PreferentialVoting extends VotingModel {
  constructor(props) {
    super(props);
    this.state = { votedata: props.votedata };
  }
  render() {
    return (
      <Col md={{ offset: 2, span: 8 }}>
        <h1>{this.state.election.electionName}</h1>
        {this.getConstituencyResults(this.state.election.candidates)}
        {this.getWinner(this.state.election.candidates)}
        {console.log(this.counts)}
      </Col>
    );
  }
}

export default PreferentialVoting;
