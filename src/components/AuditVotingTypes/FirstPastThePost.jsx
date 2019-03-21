import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col";
import "../../styles/Borders.scss";
import "../../styles/text.scss";
import ChartFactory from "../../Factories/ChartFactory";

/*
 *
 *
 * FirstPastThePost is whoever wins the most constituencies and should only be generated using the AuditVotingTypesFactory
 *
 * @props {election}
 * @exports {FirstPastThePost}
 *
 *
 */
class FirstPastThePost extends VotingModel {
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

  //first past the post = most constituencies won
  componentWillMount() {}

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

  /*
   *
   * if the user is not an auditor, super.authenticate will kick them back to elections,
   * if they are an auditor, render will return the result of getConstituencyResults and getWinner
   * Calculations are
   *
   * 1) Find out who won consistencies by choosing the highest number of votes for that constituency and store the candidate name and constituency
   *   1a) if there is a draw, that consistency is registered as undecided
   * 2) Find the candidate with the highest occurences in the above list, if there is only one they are currently winning
   *   2a) if there is multiple, its a hung parliament and there isnt really much that can be done unless the election is ongoing.
   *
   */
  render() {
    super.authenticate();
    return (
      <Col md={{ offset: 2, span: 8 }}>
        {this.nice_ifyer(this.state.election.electionName, "")}
        {this.getConstituencyResults(this.state.election.candidates)}
        {this.getWinner(this.state.election.candidates)}

        {this.nice_ifyer(
          "Winning Number of Votes by Constituency",
          ChartFactory.build({
            ChartType: "PIE",
            data: { data: this.winners, name: "constituency", datakey: "votes" }
          }),
          ""
        )}
      </Col>
    );
  }

  //orders constituencies by amount of "winners" returns undecided if there are two matching ones
  getWinner(candidates) {
    this.constituencies.map((constituency, index) => {
      this.winners.push(
        this.counts
          .filter(x => x.constituency === constituency)
          .sort((x, y) => {
            return x.votes > y.votes ? -1 : 1;
          })[0].votes === 0
          ? { name: "Undecided", constituency: constituency, votes: 0 }
          : this.counts
              .filter(x => x.constituency === constituency)
              .sort((x, y) => {
                return x.votes > y.votes ? -1 : 1;
              })[0]
      );
    });
    console.log(this.winners);
    //then returns a new element to render using the result of get overallwinner
    return (
      <h1>
        {this.getOverallWinner(this.winners)}
        {console.log(this.winner)}
      </h1>
    );
  }

  //react goes in a loop sometimes when not done like this
  assignConstituency(value) {
    this.constituencies = value;
    console.log(this.constituencies);
  }

  //react goes in a loop sometimes when not done like this
  assignVotes(value) {
    this.votes = value;
  }

  //react goes in a loop sometimes when not done like this
  pushToCount(obj) {
    this.counts.push(obj);
  }

  //orders constituencies by candidate name and finds amount of candidate name occurences then returns the winner
  getOverallWinner(candidates) {
    var a = [],
      b = [],
      prev;

    candidates = candidates.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].name !== prev) {
        a.push(candidates[i].name);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = candidates[i].name;
    }
    if (this.hasDone) {
      return this.winner;
    }
    b.forEach((won, index) => {
      console.log(index);
      if (index == 0) {
        this.winner.constituencies = won;
        this.winner.name = a[index];
        console.log("first index");
        console.log(this.winner);
      } else if (won > this.winner.constituencies) {
        this.winner.constituencies = won;
        this.winner.name = a[index];
        console.log("else if");
        console.log(this.winner);
      } else if (won == this.winner.constituencies && a[index] != "Undecided") {
        console.log("won");
        console.log(won);
        console.log("const");
        console.log(this.winner.constituencies);

        this.winner.name = "Hung Parliament";
      }
    });

    console.log(parseFloat(this.constituencies.length * 0.5));
    if (this.winner.constituencies < this.constituencies.length * 0.5) {
      this.winner.name = "Hung Parliament";
    }

    this.hasDone = true;

    if (this.winner.name === "Hung Parliament") {
      return (
        <h1>
          {this.winner.name} due to 2 or more candidates winning the same number
          of constituencies
        </h1>
      );
    } else {
      return (
        <h1>
          {this.winner.name} wins with {this.winner.constituencies + ""}{" "}
          constituencies!
        </h1>
      );
    }
  }
  //finds occurences of constiuencies within a given votes array
  getConstituencyNumbers(votes) {
    var a = [],
      b = [],
      prev;

    votes = votes.sort((a, b) => {
      if (a.forConstiuency > b.forConstiuency) {
        return -1;
      }
      if (a.forConstiuency > b.forConstiuency) {
        return 1;
      }
      return 0;
    });
    for (var i = 0; i < votes.length; i++) {
      if (votes[i].forConstiuency !== prev) {
        a.push(votes[i].forConstiuency);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = votes[i].forConstiuency;
    }

    this.state.election.forConsituencies.map((consituency, index) => {
      if (a.indexOf(consituency) === -1) {
        a.push(consituency);
        b.push(0);
      }
    });

    return [a, b];
  }

  //get a formatted element from a given candidate for use in nice_ify
  getOutputFormat(candidate) {
    return this.constituencies.map((value, index) => {
      return (
        <p>
          {console.log("im here")}
          {console.log(value + this.votes[index])}
          {this.pushToCount({
            name: candidate.candidateName,
            constituency: value,
            votes: this.votes[index]
          })}

          {value + " " + this.votes[index]}
        </p>
      );
    });
  }
  //returns a nice_ify object containing the results for each candidate
  getConstituencyResults(candidates) {
    return (
      <h1>
        {candidates.map((candidate, index) => {
          console.log(this.getOutputFormat(candidate));
          return (
            <h1>
              {console.log(this.getConstituencyNumbers(candidate.votes))}
              {this.assignConstituency(
                this.getConstituencyNumbers(candidate.votes)[0]
              )}
              {this.assignVotes(
                this.getConstituencyNumbers(candidate.votes)[1]
              )}
              <h2>
                {/*this.constituencies.map((value, index) => {
                  return (
                    <p>
                      {console.log("im here")}
                      {console.log(value + this.votes[index])}
                      {this.pushToCount({
                        name: candidate.candidateName,
                        constituency: value,
                        votes: this.votes[index]
                      })}

                      {value + " " + this.votes[index]}
                    </p>
                  );
                })*/}
                {this.nice_ifyer(
                  candidate.candidateName,
                  <img
                    src={candidate.candidatePicture}
                    alt=""
                    width="150"
                    Height="150"
                  />,
                  <div>{this.getOutputFormat(candidate)}</div>
                )}
              </h2>
              {console.log(this.constituencies)}
              {console.log(this.votes)}
            </h1>
          );
        })}
      </h1>
    );
  }
}

export default FirstPastThePost;
