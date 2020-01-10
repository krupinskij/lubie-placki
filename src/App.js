import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import RecipePage from './components/pages/RecipePage';
import RandomPage from './components/pages/RandomPage';
import AddPage from './components/pages/AddPage';
import TopPage from './components/pages/TopPage';

import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

import UserPage from './components/pages/UserPage';


class App extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div style={{position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0}}>
					<Navbar/>
					<Route exact path="/" component={HomePage} />
					<Route path="/recipe/:id" component={RecipePage} />
					<Route path="/random" component={RandomPage} />
					<Route path="/add" component={AddPage} />
					<Route path="/top" component={TopPage} />

					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />

					<Route path="/user/:id" component={UserPage} />
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
