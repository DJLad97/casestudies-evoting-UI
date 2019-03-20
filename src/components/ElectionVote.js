import React, { Component } from 'react';
import Factory from '../Factories/ElectionTypeFactory';

import '../styles/election-vote.css';

class ElectionVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: this.props.location.state.election,
        }
    }

    render() {
        return (
            <div>
                {Factory.build(this.state.election)}
            </div>
        );
    }
}

export default ElectionVote;