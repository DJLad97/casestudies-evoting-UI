import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import ElectionsList from './components/ElectionsList';
import ElectionVote from './components/ElectionVote';

import './App.css';

class App extends Component {
  render() {
    return (
		<Router>
			<div className="App">
				<Container>
					<Route path="/login" component={Login}/>
					<ProtectedRoute path="/elections" component={ElectionsList} />
					<ProtectedRoute path="/election/:name" component={ElectionVote}/>

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