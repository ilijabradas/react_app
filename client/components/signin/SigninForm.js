import React, {Component, PropTypes}  from 'react';
import _ from 'lodash';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import styles from '../formElements/formElements.scss';
import {loginUser, loginUserFailure}  from '../../actions/actionLogin';
import { addFlashMessage } from '../../actions/actionFlashMessage';
import {formUpdate}   from '../../actions/actionForm';
import FieldGroup from '../formElements/FieldGroup';
import { Form, FormControl, Col, Checkbox, Button, FormGroup, Alert } from 'react-bootstrap';
import classnames from 'classnames';
import { validateLoginForm } from '../../../server/models/validation';
import isEmpty from 'lodash/isEmpty';

// {... props} passing large number of props wrap in object with spread notation
class SigninForm extends Component { //if component have state it needs to be class
    constructor(props) {
        super(props);
    }
    onChange = (event, value) => {
       this.props.onChange(event.target.name, event.target.value);
    };
    isFormValid = () => {
    const { errors, message } =  validateLoginForm(this.props.values);
    if (!isEmpty(errors)) {
     this.props.loginUserFailure(errors, message);
     this.props.addFlashMessage(message);
    }
    return isEmpty(errors);
    }
    onSave = (event) => {
        event.preventDefault();
        if(this.isFormValid()) {
        this.props.onSave(this.props.values);
      }
    }
    getClasses(field) {
    return classnames({
      'has-error': field
    });
    }
    render() {
        return (
            <Form onSubmit={this.onSave} horizontal id="login">
                <FieldGroup
                  id="formControlsEmail"
                  type="text"
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.props.values[name]}
                  onChange={this.onChange}
                  help={this.props.errors.email}
                   className={this.getClasses(this.props.errors.email)}
                />
                <FieldGroup
                  id="formControlsPassword"
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.props.values[name]}
                  onChange={this.onChange}
                  help={this.props.errors.password}
                   className={this.getClasses(this.props.errors.password)}
                />
                <FormGroup>
                  <Col smOffset={3} sm={9}>
                    <Button type="submit"  disabled={this.props.isLoading}>
                      { this.props.isLoading ? 'Please wait...' : 'Login'}
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col smOffset={3} sm={9}>
                {this.props.message.style &&
                  <Alert bsStyle={classnames({
                    'success': this.props.message.style === 'success',
                    'danger': this.props.message.style === 'danger'
                    })}
                  >
                    {this.props.message.text}
                  </Alert>}
                  </Col>
                </FormGroup>
            </Form>
        );
    }
}
function mapStateToProps(state) {
	return {
    values: state.form.values,
		message: state.signin.message,
    errors:state.signin.errors,
    isLoading: state.form.isLoading

	};
}
function mapDispatchToProps(dispatch) {
  return {
    onSave: values => dispatch(loginUser(values)),
    onChange: (name, value) => dispatch(formUpdate(name,value)),
    loginUserFailure: (errors, message) => dispatch(loginUserFailure(errors, message)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
