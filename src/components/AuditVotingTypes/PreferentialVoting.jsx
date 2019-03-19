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

  nice_ifyer(title, image, content) {
    console.log(content);
    return (
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="h4 font-weight-bold text-primary text-uppercase mb-1">
                  {title}
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-300">
                  {image}
                </div>
              </div>
              <div class="col-auto text-gray-800 h5">
                {typeof content === Array
                  ? content.map((render, index) => {
                      return render + " " + this.votes[index];
                    })
                  : content}
              </div>
            </div>
          </div>
        </div>
      </div>
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
          return this.nice_ifyer(
            candidate.candidateName,
            <img
              src={candidate.candidatePicture}
              alt=""
              width="150"
              Height="150"
            />,
            candidate.votes.length + " Votes"
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
