import React, { Component } from "react";
import Factory from "../Factories/ElectionTypeFactory";

import "../styles/election-vote.css";

/*
 *
 * ElectionVote is the default entry point for casting a vote, and returns the currect voting type based on the election prop
 * @exports {ElectionVote}
 * @props {location}
 *
 */
class ElectionVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.location.state.election
    };
  }

  render() {
    return <div>{Factory.build(this.state.election)}</div>;
  }
}

export default ElectionVote;
