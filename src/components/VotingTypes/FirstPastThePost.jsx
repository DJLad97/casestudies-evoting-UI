import React, { Component } from "react";
import VotingModel from "./VotingModel";

class FirstPastThePost extends VotingModel {
  constructor(props) {
    super(props);
    this.state = { votedata: props.votedata };
  }
  render() {
    return <h1>gg</h1>;
  }
}

export default FirstPastThePost;
