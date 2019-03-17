import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const VoteConfirmed = (props) => {
    const electionName = props.location.state.electionName
    return (
        <div className="page-content-box confirm-info">
            <h2 id="confirm-header">Your vote for <strong>{electionName}</strong> has been submitted</h2>
            <Link to="/elections">
                <Button variant="primary" className="return-home-btn">Return to Elections Page</Button>
            </Link>
        </div>
    )
}

export default VoteConfirmed;