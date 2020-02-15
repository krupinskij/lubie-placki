import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';

import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import RecipePage from './components/pages/RecipePage';
import RandomPage from './components/pages/RandomPage';
import AddPage from './components/pages/AddPage';
import TopPage from './components/pages/TopPage';

import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

import UserPage from './components/pages/UserPage';
import EditUserPage from './components/pages/EditUserPage';
import EditRecipePage from './components/pages/EditRecipePage';

import SearchPage from './components/pages/SearchPage';

const store = createStore(rootReducer, applyMiddleware(reduxLogger, reduxThunk))

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div style={{ position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0 }}>
						<Navbar />
						<Route exact path="/" component={HomePage} />
						<Route path="/recipe/:id" component={RecipePage} />
						<Route path="/random" component={RandomPage} />
						<Route path="/add" component={AddPage} />
						<Route path="/top" component={TopPage} />

						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />

						<Route exact path="/user/:id" component={UserPage} />
						<Route path="/user/edit/:id" component={EditUserPage} />

						<Route path="/edit/:id" component={EditRecipePage} />

						<Route path="/search" component={SearchPage} />
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App;
