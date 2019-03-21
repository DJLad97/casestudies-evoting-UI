import React, { Component } from "react";
import Factory from "../Factories/AuditElectionTypeFactory";
import Auth from "../utils/auth";
import PubSub from "pubsub-js";

/*
 *
 *
 * Audit is the component used to generate the correct voting type using the AuditElectionTypeFactory
 * @exports {Audit}
 * @props {location}
 *
 */
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
