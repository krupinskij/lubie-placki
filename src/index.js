import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import './css/component.css';

import './css/navbar.css'; 
import './css/footer.css'; 

import './css/recipe.css'; 
import './css/comment.css'; 
import './css/user.css'; 
import './css/form.css'; 
import './css/controller.css'; 

import './css/modal.css';
import './css/notification.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
