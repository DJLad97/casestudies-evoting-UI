import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col";

class SingleTransferrableVote extends VotingModel {
  constructor(props) {
    super(props);
    this.state = { election: props.election };
    this.counts = [];
    this.constituencies = [];
    this.votes = [];
    this.winners = [];
    this.winner = { name: "", constituencies: 0 };
    this.hasDone = false;
    this.numberofwinners = 1;
    this.winpercentage = 0;
    this.numberofvotes = 0;
    this.winnersfound = false;
    this.loopcount = 0;
  }
  //Single Transferrable Vote = multiple

  componentWillMount() {
    if (this.state.election.amountOfWinners != undefined) {
      this.numberofwinners = this.state.election.amountOfWinners;
    }
  }
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
    console.log(candidates);
    candidates.map((candidate, index) => {
      {
        this.pushToCounts({
          name: candidate.candidateName,
          votes: candidate.votes.length
        });
      }
    });
    console.log(this.getWinPercentage(candidates));
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

  pushToWinners(obj) {
    this.winners.push(obj);
  }

  percentageCalculation(votes) {
    return (
      votes / this.numberofvotes >= this.winpercentage / 100 &&
      this.winners.length < this.numberofwinners
    );
  }

  getWinPercentage(candidates) {
    this.counts.forEach((count, index) => {
      this.numberofvotes += count.votes;
    });

    console.log(this.numberofvotes);
    console.log(Math.floor(this.numberofvotes / this.numberofwinners + 1) + 1);
    //implementation of the droop formula

    return Math.floor(this.numberofvotes / this.numberofwinners + 1) + 1;
  }

  sortArr(arr) {
    return arr.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.votes < b.votes) {
        return 1;
      }
      return 0;
    });
  }
  getWinner(candidates) {
    let votes = this.sortArr(this.counts);

    console.log(votes);

    votes.forEach((vote, index) => {
      if (this.percentageCalculation(vote.votes)) {
        this.winners.push(vote);
      }
    });

    let count = 0;

    while (this.winnersfound === false) {
      if (this.winners.length < this.numberofwinners) {
        //uh oh, not enough winners for the required percentage, simulate (2nd choices)
        votes.forEach((vote, index) => {
          if (this.winners.filter(vote) > 0) {
            //we have a winner, they dont need the extra votes
            let overflow =
              vote.votes / this.numberofvotes - this.winpercentage / 100;
            if (overflow === 0) {
              this.winnersfound = true;
            }
            let extravotes = this.numberofvotes * overflow;

            votes[votes.length - 1].votes += extravotes;
            if (this.percentageCalculation(votes[votes.length - 1].votes)) {
              this.winners.push(votes[votes.length - 1]);
              let votes = this.sortArr(votes);
              if (this.winners.length === this.numberofwinners) {
                this.winnersfound = true;
              }
            }
          }
        });
      }
      this.loopcount++;

      if (this.loopcount >= 10) {
        //cant find suitable combo, give it back anyway

        this.winnersfound = true;
      }
    }

    if (
      votes.filter(x => x.votes === votes[0].votes).length > 1 &&
      this.numberofwinners === 1
    ) {
      return (
        <h1>
          {" "}
          Too Many Winners for this election, a new election will need to be
          held
        </h1>
      );
    }
    if (this.winners.length !== this.numberofwinners) {
      return (
        <h1>
          Unable to redistribute based on popularity for the required amount of
          seats, A new election will need to be held
        </h1>
      );
    } else {
      return this.winners.map((winner, index) => {
        console.log(winner.name);

        return <h1>{winner.name}</h1>;
      });
    }
  }
}

export default SingleTransferrableVote;
