import React, { Component } from 'react';
import { Form, Nav, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import auth from '../utils/auth';

import '../styles/navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        }
    }
    
    logout = () => {
        auth.getInstance().logout();
        this.setState({loggedOut: true});
    }

    render() {
        if(!auth.getInstance().isAuthenticated() && this.state.loggedOut) {
            // alert('trying to redirect')
            return <Redirect to='/login' />
        }

        return (
            <Nav className="justify-content-end" >
                <Nav.Item>
                    <label className="checkbox-container">Accessibility Mode
                        <input type="checkbox" id="accessibility-mode"/>
                        <span className="checkbox"></span>
                    </label>
                </Nav.Item>
                <Nav.Item>
                    <Form.Control as="select">
                        <option value="ENG">English</option>
                        <option value="FR">Français</option>
                        <option value="ESP">Español</option>
                    </Form.Control>
                </Nav.Item>
                {
                    auth.getInstance().isAuthenticated() &&
                    <Nav.Item>
                        <Button variant="primary" onClick={this.logout}>Log Out</Button>
                    </Nav.Item>
                }
            </Nav>
        );
    }
}

export default Navbar;