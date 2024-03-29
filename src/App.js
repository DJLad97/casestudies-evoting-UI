import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Redirector from "./utils/Redirector";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import ElectionsList from "./components/ElectionsList";
import ElectionVote from "./components/ElectionVote";
import VoteConfirmed from "./components/VoteConfirmed";
import Navbar from "./components/Navbar";
import auth from "./utils/auth";

import ReactObserver from "react-event-observer";
import allElectionsList from "./components/AllElectionsList";
import Audit from "./components/Audit";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	zoom: 100
    }
  }

increaseZoom = () => {
	let zoom = this.state.zoom + 10;
	this.setState({zoom});
}

descreaseZoom = () => {
	let zoom = this.state.zoom - 10;
	this.setState({zoom});
}

  render() {
    return (
      <Router>
        <div className="App" style={{zoom: this.state.zoom + '%'}}>
          <Navbar increaseZoom={this.increaseZoom} descreaseZoom={this.descreaseZoom}/>
          <Container>
            {/* Must be present on all pages */}
            <Redirector />
            <div>
				<Redirect from="/election/login" to="/election" />
                <Redirect from="/" to="login" />
            </div>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/elections" component={ElectionsList} />
            <ProtectedRoute path="/election/:name" component={ElectionVote} />
            <ProtectedRoute path="/vote-confirmed/:name" component={VoteConfirmed} />
            <ProtectedRoute path="/audit/all" component={allElectionsList} />
            <ProtectedRoute
              path="/audit/viewelection/:name"
              component={Audit}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App; 
