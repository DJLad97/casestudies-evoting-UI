import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import isEmpty from "is-empty";
import { withTranslation } from "react-i18next";
import RegisterModalButton from "./RegisterModalButton";
import auth from "../utils/auth";

import "../styles/login.css";

/*
 *
 *
 * Login is used to login and register users for use in the voting system
 * @exports {Login}
 *
 *
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postCode: "",
      userCode: "",
      errors: []
    };
  }

  componentDidMount() {
    if (auth.getInstance().isAuthenticated()) {
      PubSub.publish("navigation", "/elections");
    }
  }
  /**
   * handles on change event, saves the target name and state as a key value pair in state
   * @param  {e.target.value}} {[e.target.name]
   */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /**
   *
   *
   * handles the login button click and throws relevant errors such as postcode is required
   * and prevents the default event from being triggered
   *
   *
   */
  handleSubmit = e => {
    e.preventDefault();
    let errors = [];
    if (isEmpty(this.state.postCode)) {
      errors.push("Postcode is required");
    }
    if (isEmpty(this.state.userCode)) {
      errors.push("Voting code is required");
    }
    if (isEmpty(errors)) {
      const loginData = {
        postCode: this.state.postCode.replace(/\s/g, "").toLowerCase(),
        userCode: this.state.userCode
      };
      axios
        .post(
          "http://evoting-endpoint-evoting-endpoint.1d35.starter-us-east-1.openshiftapps.com/users/login",
          loginData
        )
        .then(res => {
          const token = res.data;
          auth.getInstance().setToken(token);

          var userInfo = auth.getInstance().getUserInfo();

          axios
            .post(userInfo.expectedEndpoint + "/elections/login", loginData)
            .then(newRes => {
              const endpointToken = newRes.data;
              auth.getInstance().setConstiuencyToken(endpointToken);
              this.setState({ error: [] });
              PubSub.publish("navigation", "/elections");
            })
            .catch(err => {
              let error = [];
              error.push(err.response.data);
              this.setState({ error });
            });
        })
        .catch(err => {
          let error = [];
          error.push("Incorrect Postcode or Voting code!");
          this.setState({ error });
        });
    } else {
      this.setState({ error: errors });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div id="login-container">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div className="page-content-box">
              <h1>{t("login")}</h1>
              {!isEmpty(this.state.error) && (
                <Alert variant="danger">
                  {this.state.error.map((error, index) => {
                    return (
                      <span key={index}>
                        {error}
                        <br />
                      </span>
                    );
                  })}
                </Alert>
              )}
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicPostcode">
                  <Form.Label>
                    {/* Please enter the postcode (or your country's equivalent) you registered with: */}
                    {t("postCodeDesc")}
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder={t("postCode")}
                    name="postCode"
                    onChange={this.onChange}
                    value={this.state.postCode}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicVotingCode">
                  <Form.Label>
                    {/* Please enter your unique voting code you received in the mail: */}
                    {t("votingCodeDesc")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("votingCode")}
                    name="userCode"
                    onChange={this.onChange}
                    value={this.state.userCode}
                  />
                </Form.Group>
                <Button name="btnLogin" variant="primary" type="submit">
                  {t("login")}
                </Button>
              </Form>
              <RegisterModalButton />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// export default translate('common')(Login);
export default withTranslation()(Login);
