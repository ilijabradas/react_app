import React from 'react';
import SignupForm from './SignupForm';

class SignupPage extends React.Component {
	render() {
		return(
	      <div className="row">
	        <div className="col-md-4 col-offset-4">
					<SignupForm/>
	        </div>
	      </div>
		);
	}
}
export default SignupPage;
//TODO: add SignupForm component
