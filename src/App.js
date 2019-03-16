import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Nav, ToggleButton } from 'react-bootstrap';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import ElectionsList from './components/ElectionsList';
import ElectionVote from './components/ElectionVote';
import VoteConfirmed from './components/VoteConfirmed';

import './App.css';

class App extends Component {
  render() {
    return (
		<Router>
			<div className="App">
				<Nav activeKey="/home">
					<Nav.Item>
						<Nav.Link href="/home">Active</Nav.Link>
						<ToggleButton>Test</ToggleButton>
					</Nav.Item>
				</Nav>
				<Container>
					<Route path="/login" component={Login}/>
					<ProtectedRoute path="/elections" component={ElectionsList} />
					<ProtectedRoute path="/election/:name" component={ElectionVote}/>
					<ProtectedRoute path="/vote-confirmed" component={VoteConfirmed}/>
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