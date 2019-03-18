import React, { Component } from "react";
import Factory from "../Factories/ElectionTypeFactory";

class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.location.state.election
    };
  }
  render() {
    console.log("In Audit.js");
    return (
      <div>
        {console.log(this.state.election)}
        {Factory.build(this.state.election)}

        {console.log(this.state.election.electionType)}
        {/*this.setState({ type: Factory.build(this.state.election)*/
        console.log(this.state.type)}
      </div>
    );
  }
}

export default Audit;
