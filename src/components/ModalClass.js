import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ModalClass extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button
            name="btnClose"
            variant="secondary"
            onClick={this.props.handleClose}
          >
            {this.props.closeBtn}
          </Button>
          <Button
            name="btnConfirm"
            variant="primary"
            onClick={this.props.handleConfirm}
          >
            {this.props.confirmBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalClass;
