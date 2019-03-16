import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import userAPI from '../utils/userAPI';
import CountryDropdown from './CountryDropdown';
import NationalityDropdown from './NationalityDropdown';

import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'

class RegisterModalButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            firstName : "",
            lastName : "",
            postCode : "",
            isAuditor : false,
            countryId : "",
            nationality : "",
            dateOfBirth : "",
            fullAddress : ""
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.getRegisterForm = this.getRegisterForm.bind(this);

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handlePostCode = this.handlePostCode.bind(this);
        this.handleCountryId = this.handleCountryId.bind(this);
        this.handleNationality = this.handleNationality.bind(this);
        this.handleDOB = this.handleDOB.bind(this);
        this.handleAddress = this.handleAddress.bind(this);

        this.submitNewUser = this.submitNewUser.bind(this);
    }

    handleFirstName(event){
        this.setState({firstName: event.target.value});
    }

    handleLastName(event){
        this.setState({lastName: event.target.value});
    }

    handlePostCode(event) {
        this.setState({postCode: event.target.value});
    }

    handleCountryId(event) {
        this.setState({countryId: event.target.value});
    }

    handleNationality(event) {
        this.setState({nationality: event.target.value});
    }

    handleDOB(event) {
        this.setState({dateOfBirth: event.target.value});
    }

    handleAddress(event) {
        this.setState({fullAddress: event.target.value});
    }

    submitNewUser(event) {
        function _getAge(dateString) 
        {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            return age;
        }

        event.preventDefault();

        if (this.state.firstName == "" || this.state.firstName == null)
        {
            alert("First name is a required field!");
            return;
        }
        if (this.state.lastName == "" || this.state.lastName == null)
        {
            alert("Last name is a required field!");
            return;
        }
        if (this.state.postCode == "" || this.state.postCode == null)
        {
            alert("PostCode is a required field!");
            return;
        }
        if (this.state.countryId == "" || this.state.countryId == null)
        {
            alert("Description is a required field!");
            return;
        }
        if (this.state.nationality == "" || this.state.nationality == null)
        {
            alert("File Size is a required field!");
            return;
        }
        if (_getAge(this.state.dateOfBirth) < 18)
        {
            alert("User must be 18 to register to vote!");
            return;
        }
        if (this.state.fullAddress == "" || this.state.fullAddress == null)
        {
            alert("Full Address is a required field!");
            return;
        }

        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            isAuditor: false,
            postCode: this.state.postCode.replace(/\s/g,'').toLowerCase(),
            countryId: this.state.countryId,
            nationality: this.state.nationality,
            dateOfBirth: this.state.dateOfBirth,
            fullAddress: this.state.fullAddress,
        };

        userAPI.getInstance().registerUser(data)
        .then(res => {
            if (res.success == true) {
                alert(`Account Created! (PROTOTYPE: YOU RECEIVED THE FOLLOWING CODE IN THE MAIL... ${res.userCode.toString()})`);
                this.closeModal();
            }
            else
                alert("Something went wrong, please try again later");
        })
    }

    openModal() {
        this.setState({modalIsOpen: true});

        this.setState({firstName: ""});
        this.setState({lastName: ""});
        this.setState({postCode: ""});
        this.setState({countryId: ""});
        this.setState({nationality: ""});
        this.setState({dateOfBirth: ""});
        this.setState({fullAddress: ""});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    getRegisterForm() {
        return (
            <div>
                <form onSubmit={this.submitNewUser}>
                <p>(* indicates a required field)</p>

                    <h5>First Name: *</h5>
                    <input name='FirstName' value={this.state.firstName} onChange={this.handleFirstName} required />

                    <h5>Last Name: *</h5>
                    <input name='LastName' value={this.state.lastName} onChange={this.handleLastName} required />

                    <h5>Postcode: *</h5>
                    <input name='Postcode' value={this.state.postCode} onChange={this.handlePostCode} required />

                    <h5>Country: *</h5>
                    {/* <input name='Country' value={this.state.countryId} onChange={this.handleCountryId} required /> */}
                    <CountryDropdown value={this.state.countryId} onChange={this.handleCountryId} required={true}/>

                    <h5>Nationality: *</h5>
                    {/* <input name='Nationality' value={this.state.nationality} onChange={this.handleNationality} required /> */}
                    <NationalityDropdown value={this.state.nationality} onChange={this.handleNationality} required={true} />

                    <h5>Date of Birth *</h5>
                    <input name='dob' type="date" value={this.state.dateOfBirth} onChange={this.handleDOB} required />

                    <h5>Full Address: *</h5>
                    <input name='Full Address' value={this.state.fullAddress} onChange={this.handleAddress} required />
                    <hr />

                    <input type="submit" className="btn btn-info" value="Register to vote"/>
                </form>
            </div>
        );
    }

    render() {
        return (
        <div className="">

            <button type="button" className="btn btn-success" data-toggle="modal" data-target="registerModal" onClick={this.openModal}>
                Or Register To Vote 
            </button>
            <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.getRegisterForm()}
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}

export default RegisterModalButton;