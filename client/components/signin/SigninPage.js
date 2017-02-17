import React, {Component} from 'react';
import SigninForm from './SigninForm';
import { Grid, Row, Col, ListGroupItem  } from 'react-bootstrap';
import { Link } from 'react-router';

class SigninPage extends Component {

    render() {
        return (
          <Grid>
          <Row>
            <Col sm={6} smPush={3}>
              <SigninForm/>
            </Col>
          </Row>
          <Row>
            <Col sm={6} smPush={3}>
              <ListGroupItem bsStyle="info">{"Don't have an account?"}<Link to={'/signup'}>Register here</Link></ListGroupItem>
            </Col>
          </Row>
         </Grid>
        );
    }
}

export default SigninPage;
