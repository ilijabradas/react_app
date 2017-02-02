import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionSignup';

class SignupPage extends React.Component {
	propTypes: {
	userSignupRequest: React.PropTypes.func.isRequired
 }
	render() {
		return(
	      <div className="row">
	        <div className="col-md-4 col-md-offset-4">
					<SignupForm saveUser={this.props.saveUser} />
	        </div>
	      </div>
		);
	}
}
// function mapStateToProps(state) {
//   return { saved: state.signup.saved
//    };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     saveUser: () => dispatch(saveUser())
//   };
// }
export default connect(null, actions )(SignupPage);
/**
 * This page get this function userSignupRequest from redux
 *  We use connect, higher ordewr component to provide
 * this thunk function to page component
 */
/**
 * connect takes in two parameters 1st:mapstatetoprops, it
 * takes state and returns object, 2nd mapdispatchtoprops
 * where we specified action creators wrapped in dispatch
 */
