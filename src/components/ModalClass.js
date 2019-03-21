import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

/*
 *
 *
 * ModalClass is a component used to render modals on request using the show and close events passed into props
 *@prop {handleShow} event to be triggered when component is first rendered
 *@prop {handleClose} event to be triggered before the modal component is closed
 *
 *
 */
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
            className="ui-btn"
            onClick={this.props.handleClose}
            aria-label="No"
          >
            {this.props.closeBtn}
          </Button>
          <Button
            name="btnConfirm"
            className="ui-btn"
            variant="primary"
            onClick={this.props.handleConfirm}
            aria-label="Yes"
          >
            {this.props.confirmBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalClass;
