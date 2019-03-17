import React, { Component } from "react";
import VotingModel from "./VotingModel";

class SingleTransferrableVote extends VotingModel {
  constructor(props) {
    super(props);
    this.state = { votetype: props.votetype };
  }
  render() {
    return <h1>gg</h1>;
  }
}

export default SingleTransferrableVote;
