import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import ElectionsList from "./components/ElectionsList";
import ElectionVote from "./components/ElectionVote";
import ReactObserver from "react-event-observer";

import "./App.css";
import Audit from "./components/Audit";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/elections" component={ElectionsList} />
            <ProtectedRoute path="/election/:name" component={ElectionVote} />
            <ProtectedRoute path="/audit/:name" component={Audit} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

// const Election = (props) => {
//     return (
//         <div>
//             <h3>{props.election}</h3>
//         </div>
//     )
// }
