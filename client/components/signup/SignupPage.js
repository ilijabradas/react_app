import React, {Component} from 'react';
import SignupForm from './SignupForm';
import { Grid, Row, Col, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class SignupPage extends Component {

    render() {
        return (
          <Grid>
					<Row>
	          <Col sm={6} smPush={3}>
							<SignupForm/>
	          </Col>
          </Row>
          <Row>
            <Col sm={6} smPush={3}>
              <ListGroupItem bsStyle="info">Already have an account? <Link to={'/signin'}>Log in</Link></ListGroupItem>
            </Col>
          </Row>
         </Grid>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     saveUser: () => dispatch(saveUser())
//   };
// }
export default SignupPage;
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
