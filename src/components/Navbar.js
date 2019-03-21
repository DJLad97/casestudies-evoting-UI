import React, { Component } from "react";
import { Form, Nav, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import auth from "../utils/auth";

import "../styles/navbar.css";

/*
 *
 *
 * Navbar is used to enable accessiblity options, change langauges and logout if the user is logged in
 * and is exported with the higher order component withTranslation()
 * @exports withTransalation() Navbar
 * @returns {Nav}
 */

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false,
      lang: "en",
      accessibilityMode: false
    };
  }

  /*
   *
   *
   * changes langauge based on the langauge passed as the event into this handler
   *
   *
   */
  changeLanguage = e => {
    this.setState({ lang: e.target.value });
    i18n.changeLanguage(e.target.value);
  };

  /*
   *
   *
   * changes the value of accessiblity mode using an event trigger
   *
   *
   */

  handleAccessibilityMode = e => {
    this.setState({ accessibilityMode: !this.state.accessibilityMode });
    if (!this.state.accessibilityMode) {
      document.body.classList.add("accessibility-mode");
    } else {
      document.body.classList.remove("accessibility-mode");
    }
  };

  logout = () => {
    auth.getInstance().logout();
    this.setState({ loggedOut: true });
  };

  /*
   *
   *
   * Deletes the users local session tokens and logs them out
   *
   *
   */
  logout = () => {
    auth.getInstance().logout();
    this.setState({ loggedOut: true });
  };

  render() {
    const { t } = this.props;
    if (!auth.getInstance().isAuthenticated() && this.state.loggedOut) {
      return <Redirect to="/login" />;
    }
    return (
      <Nav className="justify-content-end">
        {this.state.accessibilityMode && (
          <Nav.Item>
            <label style={{ "font-size": "1.2em" }}>{t("zoom")}</label>
            <Button
              variant="secondary"
              aria-label="Increase Zoom"
              onClick={this.props.increaseZoom}
              className="zoom-btn"
            >
              <span aria-hidden="true">&#43;</span>
            </Button>
            <Button
              variant="secondary"
              aria-label="Decrease Zoom"
              onClick={this.props.descreaseZoom}
              className="zoom-btn"
            >
              <span aria-hidden="true">&#8722;</span>
            </Button>
          </Nav.Item>
        )}
        <Nav.Item>
          <label className="checkbox-container">
            {t("accessibilityMode")}
            <input
              type="checkbox"
              defaultChecked={this.state.accessibilityMode}
              onChange={this.handleAccessibilityMode}
              id="accessibility-mode-checkbox"
            />
            <span className="checkbox" />
          </label>
        </Nav.Item>
        <Nav.Item>
          <Form.Control
            aria-label="Language select"
            className="language"
            value={this.state.lang}
            onChange={this.changeLanguage}
            as="select"
          >
            <option aria-label="English" value="en">
              English
            </option>
            <option aria-label="French" value="fr">
              Français
            </option>
            <option aria-label="Spanish" value="es">
              Español
            </option>
            <option aria-label="Welsh" value="cy">
              Cymraeg
            </option>
          </Form.Control>
        </Nav.Item>
        {auth.getInstance().isAuthenticated() && (
          <Nav.Item>
            <Button
              variant="primary"
              className="logout-btn"
              onClick={this.logout}
            >
              {t("logout")}
            </Button>
          </Nav.Item>
        )}
      </Nav>
    );
  }
}
export default withTranslation()(Navbar);
