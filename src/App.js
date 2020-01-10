import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import RandomPage from './components/RandomPage';
import AddPage from './components/AddPage';
import TopPage from './components/TopPage';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';


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
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
