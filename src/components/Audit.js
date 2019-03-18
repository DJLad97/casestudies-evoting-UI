import React, { Component } from "react";
import Factory from "../Factories/ElectionTypeFactory";
import Auth from "../utils/auth";
import PubSub from "pubsub-js";

class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election:
        this.props.location.state !== undefined
          ? this.props.location.state.election
          : ""
    };
  }
  componentWillMount() {
    if (!Auth.getInstance().getUserInfo().isAuditor) {
      console.log("Should have redirected");
      PubSub.publish("navigation", "/elections");
      return;
    }
  }
  render() {
    console.log("In Audit.js");
    if (this.state.election === undefined) {
      return <h1>gg</h1>;
    }
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
