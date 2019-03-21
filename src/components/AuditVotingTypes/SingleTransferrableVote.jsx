import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col";
import "../../styles/Borders.scss";
import "../../styles/text.scss";

/*
 *
 * SingleTransferrableVote has the ability to do elections with a single winner and multiple winners,
 * STV is quite similar to PreferentialVoting with the exception that "Excess" votes from the winners percentage are redistributed
 * We didnt store the preference of each voter in the database as this would potentially be identifiable data and would conflict with GDPR
 * as a result, we have simulated this part with random distribution until the number of winners has been met
 * @exports {SingleTransferrableVote}
 * @returns {Col}
 */
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

  //renders a card with nice formatting
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

  //If an election isn't provided with the election, its assumed to be a 1 winner election, otherwise we assign it from the database
  componentWillMount() {
    if (this.state.election.amountOfWinners != undefined) {
      this.numberofwinners = this.state.election.amountOfWinners;
    }
  }

  render() {
    return (
      <Col md={{ offset: 2, span: 8 }}>
        {this.nice_ifyer(this.state.election.electionName)}
        {this.getResults(this.state.election.candidates)}
        {this.getWinner(this.state.election.candidates)}
        {console.log(this.counts)}
      </Col>
    );
  }

  /*
   *
   *
   *
   * getResults pushes results to the counts array for use in other functions in this component,
   * as well as rendering the candidate names, images and votes
   *
   *
   */
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
    return candidates.map((candidate, index) => {
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
    });
  }
  //react goes in a loop sometimes when not done like this
  pushToCounts(obj) {
    this.counts.push(obj);
  }
  //react goes in a loop sometimes when not done like this
  pushToWinners(obj) {
    this.winners.push(obj);
  }

  /* finds whether or not the candidate has achieved the amount of votes they need to win a spot in this election
   * @param {votes int}
   */
  percentageCalculation(votes) {
    return (
      votes / this.numberofvotes >= this.winpercentage / 100 &&
      this.winners.length < this.numberofwinners
    );
  }

  /*
   * Calculates the win percentage using the most used method,
   * The droop formula, by calculating all votes and then math. flooring in the format
   * floor(x/y+1) +1
   * More can be learned at
   * https://en.wikipedia.org/wiki/Single_transferable_vote#More_refined_method:_setting_the_quota
   */
  getWinPercentage(candidates) {
    this.counts.forEach((count, index) => {
      this.numberofvotes += count.votes;
    });

    console.log(this.numberofvotes);
    console.log(Math.floor(this.numberofvotes / this.numberofwinners + 1) + 1);
    //implementation of the droop formula

    return Math.floor(this.numberofvotes / this.numberofwinners + 1) + 1;
  }

  /*
   *
   *
   * sorts an array that contains a votes property on demand
   * @params {arr}
   *
   */
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

    //if any candidate has reached the threshhold without needing pity votes, add them to the winners list
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
        //cant find suitable combo, give it and register as undecided

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
