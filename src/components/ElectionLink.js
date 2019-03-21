import React from "react";
import { Route, Redirect } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

/*
 *
 * Election link is used as the default component to display elections inside of ElectionsList and All ElectionsList
 * @exports {ElectionLink}
 * @props {name}
 *
 */

const ElectionLink = props => {
  return (
    <Col md={{ span: 8, offset: 2 }}>
      <div className="election-link">
        <p className="election-name">{props.name}</p>
      </div>
    </Col>
  );
};

export default ElectionLink;
