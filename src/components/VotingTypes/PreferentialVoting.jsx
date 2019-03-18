import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col";

class PreferentialVoting extends VotingModel {
  constructor(props) {
    super(props);
    this.state = { election: props.election };
    this.counts = [];
    this.constituencies = [];
    this.votes = [];
    this.winners = [];
    this.winner = { name: "", constituencies: 0 };
    this.hasDone = false;
  }
  //Preferential Vote = 1 winner
  render() {
    return (
      <Col md={{ offset: 2, span: 8 }}>
        <h1>{this.state.election.electionName}</h1>
        {this.getResults(this.state.election.candidates)}
        {this.getWinner(this.state.election.candidates)}
        {console.log(this.counts)}
      </Col>
    );
  }

  getResults(candidates) {
    console.log(this.state.election);
    candidates.map((candidate, index) => {
      {
        this.pushToCounts({
          name: candidate.candidateName,
          votes: candidate.votes.length
        });
      }
    });
    return (
      <h1>
        {candidates.map((candidate, index) => {
          console.log(candidate);
          return (
            <h1>
              <img
                src={candidate.candidatePicture}
                alt=""
                width="150"
                Height="150"
              />
              {candidate.candidateName}: {candidate.votes.length}
            </h1>
          );
        })}
      </h1>
    );
  }

  pushToCounts(obj) {
    this.counts.push(obj);
  }
  getWinner(candidates) {
    let votes = this.counts.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.votes < b.votes) {
        return 1;
      }
      return 0;
    });
    console.log(votes);
    if (votes.filter(x => x.votes === votes[0].votes).length > 1) {
      console.log(votes.filter(x => x.votes === votes[0].votes).length > 1);

      return <h1>Tie</h1>;
    } else {
      return <h1>{votes[0].name} is the winner!</h1>;
    }
  }
}

export default PreferentialVoting;
