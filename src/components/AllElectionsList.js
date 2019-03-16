import React, { Component } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Link, Route } from "react-router-dom";

import auth from "../utils/auth";
import ElectionLink from "./ElectionLink";
import ProtectedRoute from "./ProtectedRoute";
import ElectionVote from "./ElectionVote";

import "../styles/elections-list.css";

class AllElectionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentElections: [],
      loading: true
    };
  }

  componentDidMount() {
    const headers = {
      headers: {
        "x-access-token": auth.getToken()
      }
    };
    // console.log(axios.defaults.headers);
    axios
      .get(
        "http://evoting-voting2-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com/elections",
        headers
      )
      .then(res => {
        console.log(res);
        this.setState({ currentElections: res.data, loading: false });
      });
    // console.log(auth.getUserInfo());
  }

  renderElections = () => {
    return this.state.currentElections.map((election, index) => {
      const formattedName = election.electionName
        .toLowerCase()
        .replace(/-/g, "")
        .replace(/ /g, "-");
      return (
        <React.Fragment>
          <Link
            key={index}
            to={{ pathname: `/election/${formattedName}`, state: { election } }}
          >
            <ElectionLink name={election.electionName} />
          </Link>

          <Button className="AsAuditor" variant="outline-dark">
            <Link
              key={index}
              to={{ pathname: `/audit/${formattedName}`, state: { election } }}
            >
              {" "}
              View as Auditor
            </Link>
          </Button>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <div className="page-content-box elections-list">
        <h3 id="elections-list-header">
          Please choose the election you wish to vote in
        </h3>
        <Row>
          {this.renderElections()}
          <Col md={{ span: 8, offset: 2 }}>
            {this.state.loading && <div className="lds-dual-ring" />}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AllElectionsList;
