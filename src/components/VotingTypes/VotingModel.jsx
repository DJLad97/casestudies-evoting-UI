import React, { Component } from "react";
import Auth from "../../utils/auth";
import PubSub from "pubsub-js";

class VotingModel extends Component {
  constructor(props) {
    super(props);
    this.state = { votedata: props.votedata };
  }
  render() {
    return <h1>gg</h1>;
  }

  authenticate() {
    if (!Auth.getInstance().getUserInfo().isAuditor) {
      PubSub.publish("navigation", "/elections");
    }
  }

  returnFullTypeString(data) {
    switch (data.electionType) {
      case "FPTP":
        return <h2>First Past The Post</h2>;
      case "PV":
        return <h2>Preferential Voting</h2>;
      case "STV":
        return <h2>Single Transferrable Vote</h2>;
      default:
        return undefined;
    }
  }
}

export default VotingModel;
