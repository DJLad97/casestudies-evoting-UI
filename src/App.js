import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Elections from './components/Elections';

class App extends Component {
  render() {
    return (
		<Router>
			<div className="App">
				<Container>
					<Route path="/login" component={Login}/>
					<ProtectedRoute path="/elections" component={Elections} />
				</Container>
			</div>
		</Router>
    );
  }
}

export default App;
