import React, {Component, PropTypes}  from 'react';
import _ from 'lodash';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import styles from '../formElements/formElements.scss';
import {loginUser}  from '../../actions/actionLogin';
import FieldGroup from '../formElements/FieldGroup';
import { Form, FormControl, Col, Checkbox, Button, FormGroup } from 'react-bootstrap';

// {... props} passing large number of props wrap in object with spread notation
class SigninForm extends Component { //if component have state it needs to be class
    constructor(props) {
        super(props);
    }

    render() {
       const { handleSubmit, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FieldGroup
                  id="formControlsEmail"
                  type="text"
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.props.values[name]}
                  onChange={this.onChange}
                  help={this.state.errors.email}
                />
                <FieldGroup
                  id="formControlsPassword"
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.props.values[name]}
                  onChange={this.onChange}
                  help={this.state.errors.password}
                />
                <FormGroup>
                 <Col smOffset={4} sm={8}>
                  <Button type="submit"/>
                </Col>
                    </FormGroup>
								{this.props.errorMessage && this.props.errorMessage.login &&
              <div className="help-block">{this.props.errorMessage.login}</div>}
            </Form>
        );
    }
}
const validate = values => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if(!(f in values)) {
      errors[f] = `${f} is required`;
    }
  });
  if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please provide valid email';
  }

  return errors;
};
function mapStateToProps(state) {
	return {
		errorMessage: state.signin.error,

	};
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(loginUser(data))
  };
}
/* eslint-disable */
SigninForm = reduxForm({
	form: 'login',
	validate
})(SigninForm);
/*eslint-enable */
export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
