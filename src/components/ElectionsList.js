import React, { Component } from "react";
import axios from "axios";
import { Row, Button, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import isEmpty from "is-empty";

import auth from "../utils/auth";
import ElectionLink from "./ElectionLink";

import "../styles/elections-list.css";

class ElectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentElections: [],
      loading: true
    };
    this.isAuditor = false;
  }

  componentDidMount() {
    const headers = {
      headers: {
        "x-access-token": auth.getInstance().getToken(),
        "x-access-token2": auth.getInstance().getConsToken()
      }
    };
    // console.log(axios.defaults.headers);
    let baseurl = auth.getInstance().getUserInfo().expectedEndpoint;
    this.isAuditor = auth.getInstance().getUserInfo().isAuditor;
    console.log(this.isAuditor);
    axios.get(baseurl + "/elections/current", headers).then(res => {
      // console.log(res);
      this.setState({ currentElections: res.data, loading: false });
    });
    // console.log(auth.getInstance().getUserInfo());
  }

  renderElections = () => {
    return this.state.currentElections.map((election, index) => {
      const formattedName = election.electionName
        .toLowerCase()
        .replace(/-/g, "")
        .replace(/ /g, "-");

      return (
        <React.Fragment key={index}>
          <Link
            key={index}
            to={{ pathname: `/election/${formattedName}`, state: { election } }}
          >
            <ElectionLink name={election.electionName} />
          </Link>

          {this.isAuditor && (
            <Button className="AsAuditor" variant="outline-dark">
              <Link
                key={index}
                to={{
                  pathname: `/audit/viewelection/${formattedName}`,
                  state: { election }
                }}
              >
                {" "}
                View as Auditor
              </Link>
            </Button>
          )}
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
          <Col md={{ span: 8, offset: 2 }}>
            {isEmpty(this.state.currentElections) && !this.state.loading && (
              <Alert variant="warning">
                <p>No elections available!</p>
              </Alert>
            )}
          </Col>
          {!isEmpty(this.state.currentElections) && this.renderElections()}

          <Col md={{ span: 8, offset: 2 }}>
            {this.state.loading && <div className="lds-dual-ring" />}
            {!this.state.loading && this.isAuditor && (
              <Button
                name="btnViewAll"
                className="AsAuditor"
                variant="outline-dark"
              >
                <Link
                  to={{
                    pathname: `/audit/all`
                  }}
                >
                  {" "}
                  View all elections
                </Link>
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ElectionsList;
