	import React, { Component } from 'react';
	import timezones from '../../data/timezones';
	import _ from 'lodash';

	class SignupForm extends Component { //if component have state it needs to be class
		propTypes: {
		userSignupRequest: React.PropTypes.func.isRequired
	 }
	 constructor(props) {
		 super(props);
		 this.state = {
			 username: '',
			 email: '',
			 password: '',
			 passwordConfirmation: '',
			 timezone: ''
		 };
	 }
	 onChange = (e) => {
		 this.setState({
			 [e.target.name]:e.target.value
		 });
	 }
	 onSubmit = (e) => {
		 e.preventDefault();
		 /** here we call a function which will store the state*/
		 this.props.saveUser(this.state);
	 }
   render() {
		 const options = _.map(timezones, (key, val) => {
			return  <option key={key} value={val}>{val}</option>;
		 });

			return (
				<form onSubmit={this.onSubmit}>
					<h1>Join our Community!</h1>
					<div className="form-group">
						<label htmlFor="" className="control-label">Username</label>
						<input
							value={this.state.username}
							onChange={this.onChange}
							type="text"
							name="username"
							className="form-control"
						/>
				  </div>
					<div className="form-group">
						<label htmlFor="" className="control-label">Email</label>
						<input
							value={this.state.email}
							onChange={this.onChange}
							type="text"
							name="email"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label">Password</label>
						<input
							value={this.state.password}
							onChange={this.onChange}
							type="password"
							name="password"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label">Password Confirmation</label>
						<input
							value={this.state.passwordConfirmation}
							onChange={this.onChange}
							type="password"
							name="passwordConfirmation"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label">Time Zone</label>
						<select
							value={this.state.timezone}
							onChange={this.onChange}
							name="timezone"
							className="form-control"
						>
						<option value="" disabled="disabled">Choose your timezone</option>
						{options}
					  </select>
					</div>
				 <div className="form-group">
	        <button className="btn btn-primary btn-large">
	        Sign Up
					</button>
				 </div>
				</form>
			);
		}
	}

	export default SignupForm;
