import React, { Component } from 'react';

class ElectionVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: this.props.location.state.election
        }
    }
    
    render() {
        console.log(this.state.election);
        return (
            <div>
                {/* {this.props.location.state.} */}
            </div>
        );
    }
}

export default ElectionVote;