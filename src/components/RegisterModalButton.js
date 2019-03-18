import React, { Component } from "react";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";
import userAPI from "../utils/userAPI";
import CountryDropdown from "./CountryDropdown";
import NationalityDropdown from "./NationalityDropdown";

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

class RegisterModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      firstName: "",
      lastName: "",
      postCode: "",
      isAuditor: false,
      countryId: "",
      nationality: "",
      dateOfBirth: "",
      fullAddress: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.getRegisterForm = this.getRegisterForm.bind(this);

    this.submitNewUser = this.submitNewUser.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNewUser(event) {
    function _getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    event.preventDefault();

    if (this.state.firstName == "" || this.state.firstName == null) {
      alert("First name is a required field!");
      return;
    }
    if (this.state.lastName == "" || this.state.lastName == null) {
      alert("Last name is a required field!");
      return;
    }
    if (this.state.postCode == "" || this.state.postCode == null) {
      alert("PostCode is a required field!");
      return;
    }
    if (this.state.countryId == "" || this.state.countryId == null) {
      alert("Country is a required field!");
      return;
    }
    if (this.state.nationality == "" || this.state.nationality == null) {
      alert("Nationality is a required field!");
      return;
    }
    if (_getAge(this.state.dateOfBirth) < 18) {
      alert("User must be 18 to register to vote!");
      return;
    }
    if (this.state.fullAddress == "" || this.state.fullAddress == null) {
      alert("Full Address is a required field!");
      return;
    }

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAuditor: false,
      postCode: this.state.postCode.replace(/\s/g, "").toLowerCase(),
      countryId: this.state.countryId,
      nationality: this.state.nationality,
      dateOfBirth: this.state.dateOfBirth,
      fullAddress: this.state.fullAddress
    };

    userAPI
      .getInstance()
      .registerUser(data)
      .then(res => {
        if (res.success == true) {
          alert(
            `Account Created! (PROTOTYPE: YOU RECEIVED THE FOLLOWING CODE IN THE MAIL... ${res.userCode.toString()})`
          );
          this.closeModal();
        } else alert("Something went wrong, please try again later");
      });
  }

  openModal() {
    this.setState({ modalIsOpen: true });

    this.setState({ firstName: "" });
    this.setState({ lastName: "" });
    this.setState({ postCode: "" });
    this.setState({ countryId: "" });
    this.setState({ nationality: "" });
    this.setState({ dateOfBirth: "" });
    this.setState({ fullAddress: "" });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getRegisterForm() {
    return (
      <div>
        <form onSubmit={this.submitNewUser}>
          <p>(* indicates a required field)</p>

          <Form.Group>
            <Form.Label>First Name: *</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={this.onChange}
              value={this.state.firstName}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={this.onChange}
              value={this.state.lastName}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Postcode: *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postcode"
              name="postCode"
              onChange={this.onChange}
              value={this.state.postCode}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country: *</Form.Label>
            <CountryDropdown
              value={this.state.countryId}
              onChange={this.onChange}
              required={true}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nationality: *</Form.Label>
            <NationalityDropdown
              value={this.state.nationality}
              onChange={this.onChange}
              required={true}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date of Birth: *</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              onChange={this.onChange}
              value={this.state.dateOfBirth}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Full Address: *</Form.Label>
            <Form.Control
              type="text"
              name="fullAddress"
              onChange={this.onChange}
              value={this.state.fullAddress}
              required
            />
          </Form.Group>
          <hr />

          <input
            type="submit"
            className="btn btn-info"
            value="Register to vote"
          />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="">
        <button
          name="btnRegister"
          type="button"
          id="register-btn"
          className="btn btn-success"
          data-toggle="modal"
          data-target="registerModal"
          onClick={this.openModal}
        >
          Or Register To Vote
        </button>
        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.getRegisterForm()}</Modal.Body>

          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

export default RegisterModalButton;
