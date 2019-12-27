import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RandomPage from './components/RandomPage';
import AddPage from './components/AddPage';
import TopPage from './components/TopPage';

class App extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<Navbar/>
					<Route exact path="/" component={HomePage} />
					<Route path="/random" component={RandomPage} />
					<Route path="/add" component={AddPage} />
					<Route path="/top" component={TopPage} />
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
