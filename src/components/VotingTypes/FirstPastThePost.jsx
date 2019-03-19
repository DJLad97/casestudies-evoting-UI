import React, { Component } from "react";
import VotingModel from "./VotingModel";
import Col from "react-bootstrap/Col";
import "../../styles/Borders.scss";
import "../../styles/text.scss";

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

  componentWillMount() {}

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

  render() {
    super.authenticate();
    return (
      <Col md={{ offset: 2, span: 8 }}>
        {this.nice_ifyer(this.state.election.electionName, "")}
        {this.getConstituencyResults(this.state.election.candidates)}
        {this.getWinner(this.state.election.candidates)})
      </Col>
    );
  }

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
    return (
      <h1>
        {this.getOverallWinner(this.winners)}
        {console.log(this.winner)}
      </h1>
    );
  }

  assignConstituency(value) {
    this.constituencies = value;
    console.log(this.constituencies);
  }

  assignVotes(value) {
    this.votes = value;
  }

  pushToCount(obj) {
    this.counts.push(obj);
  }

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
