import React from 'react'; 
import { Route, Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const ElectionLink = (props) => {
    return (
        <Col md={{ span: 8, offset: 2}}>
            <div className="election-link">
                <p className="election-name">{props.name}</p>
            </div>
        </Col>
    )
}

export default ElectionLink;