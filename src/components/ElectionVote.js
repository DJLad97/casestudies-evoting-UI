import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import '../styles/election-vote.css';

class ElectionVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            election: this.props.location.state.election
        }
    }
    
    renderCandidates = () => {
        return this.state.election.candidates.map((candidate, index) => {
            return (
                <Col md={{ span: 8, offset: 2}} key={index}>
                    <div className="candidate">
                        {/* <input type="radio" className="candidate" name="vote" id={candidate.candidateName}/>
                        <label htmlFor={candidate.candidateName}>
                            {candidate.candidateName}<br/>
                            {candidate.party}
                        </label> */}
                        <label className="radio-container">
                            <p className="candidate-title">
                                <strong>{candidate.candidateName}</strong>
                                <br/>
                                {candidate.party}
                            </p>
                            <input type="radio" name="vote"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </Col>
            )
        })
    }
    render() {
        console.log(this.state.election);
        return (
            <div>
                <div className="page-content-box">
                    <h4 id="instructions">
                        Please click on the candidate you wish to vote for
                        <br/>
                        You will only be able to choose one candidate
                    </h4>
                    {/* {this.props.location.state.} */}
                        <form>
                            {/* <input type="radio" className="candidate" name="radio3" id="jeremy"/><label htmlFor="jeremy">Jeremy</label> */}
                            {/* <input type="radio" className="candidate" name="radio3" id="theresa"/><label htmlFor="theresa">Theresa</label> */}
                            {/* <input type="radio" className="candidate" name="radio3" id="boris"/><label htmlFor="boris">Boris</label> */}
                            <Row>
                                {this.renderCandidates()}
                            </Row>
                        </form>
                </div>
            </div>
        );
    }
}

export default ElectionVote;