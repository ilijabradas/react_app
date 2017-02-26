import React, {Component} from 'react';
import VerificationForm from './VerificationForm';
import {connect} from 'react-redux';
import { verifyUser } from '../../actions/actionVerify';
import { Grid, Row, Col } from 'react-bootstrap';

class VerificationPage extends Component {
  constructor(props) {
      super(props);
  }
    render() {
        return (
          <Grid>
					<Row>
	          <Col sm={6} smPush={3}>
							<VerificationForm onSave={() => {
                this.props.onSave(this.props.params.token);
                }} message={this.props.message} isLoading={this.props.isLoading}
							/>
	          </Col>
          </Row>
         </Grid>
        );
    }
}
function mapStateToProps(state) {
	return {
		message: state.verify.message,
    isLoading: state.form.isLoading
	};
}
function mapDispatchToProps(dispatch) {
  return {
    onSave: (token) => dispatch(verifyUser(token))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationPage);
