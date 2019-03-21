import React, { Component } from 'react';
import { Form, Nav, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next'
import auth from '../utils/auth';

import '../styles/navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            lang: 'en',
            accessibilityMode: false
        }
    }

    changeLanguage = (e) => {
        this.setState({lang: e.target.value})
        i18n.changeLanguage(e.target.value);
    }

    handleAccessibilityMode = (e) => {
        this.setState({accessibilityMode: !this.state.accessibilityMode});
    }
    
    logout = () => {
        auth.getInstance().logout();
        this.setState({loggedOut: true});
    }

    render() {
        const { t } = this.props;
        if(!auth.getInstance().isAuthenticated() && this.state.loggedOut) {
            return <Redirect to='/login' />
        }

        return (
            <Nav className="justify-content-end" >
                
                {
                    (this.state.accessibilityMode) &&
                    <Nav.Item>
                        <label className="checkbox-container">{t('zoom')}
                            <Button variant="secondary" onClick={this.props.increaseZoom} className="zoom-btn">&#43;</Button>
                            <Button variant="secondary" onClick={this.props.descreaseZoom} className="zoom-btn">&#8722;</Button>
                        </label>
                    </Nav.Item>
                }
                <Nav.Item>
                    <label className="checkbox-container">{t('accessibilityMode')}
                        <input type="checkbox" defaultChecked={this.state.accessibilityMode} 
                            onChange={this.handleAccessibilityMode}
                            id="accessibility-mode"/>
                        <span className="checkbox"></span>
                    </label>
                </Nav.Item>
                <Nav.Item>
                    <Form.Control value={this.state.lang} onChange={this.changeLanguage} as="select">
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="cy">Cymraeg</option>
                    </Form.Control>
                </Nav.Item>
                {
                    auth.getInstance().isAuthenticated() &&
                    <Nav.Item>
                        <Button variant="primary" onClick={this.logout}>{t('logout')}</Button>
                    </Nav.Item>
                }
            </Nav>
        );
    }
}

export default withTranslation()(Navbar);