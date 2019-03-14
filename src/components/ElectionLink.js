import React from "react";
import { Route, Redirect } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ElectionLink = props => {
  return (
    <Col md={{ span: 8, offset: 2 }}>
      <div className="election-link">
        <p className="election-name">{props.name}</p>
      </div>
    </Col>
  );
};

function handleClick() {
  console.log("handled it mate");
}

export default ElectionLink;
