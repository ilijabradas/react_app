import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import SigninPage from './components/signin/SigninPage';

export default (
	<Route path="/" component={App}>
	<IndexRoute component={Greetings}/> //make all main routes components as class components
	<Route path="signup" component={SignupPage}/>
	<Route path="signin" component={SigninPage}/>
	</Route>
);
