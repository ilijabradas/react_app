import React, {Component}  from 'react';
import {connect} from 'react-redux';
import map from 'lodash/map';
import timezones from '../../data/timezones';
import styles from '../formElements/formElements.scss';
import { formUpdate }   from '../../actions/actionForm';
import { registerUser, registerUserFailure } from '../../actions/actionRegister';
import { addFlashMessage, resetFlashMessages } from '../../actions/actionFlashMessage';
import FieldGroup from '../formElements/FieldGroup';
import { Form, FormControl, Col, Checkbox, Button, FormGroup, Label, Alert } from 'react-bootstrap';
import classnames from 'classnames';
import { validateSignupForm } from '../../../server/models/validation';
import isEmpty from 'lodash/isEmpty';

// {... props} passing large number of props wrap in object with spread notation
class SignupForm extends Component { //if component have state it needs to be class
    constructor(props) {
        super(props);
    }
    onChange = (event, index, value) => {
       this.props.onChange(event.target.name, event.target.value);
    };
    isFormValid = () => {
    const { errors, message } =  validateSignupForm(this.props.values);
    if (!isEmpty(errors)) {
      this.props.registerUserFailure(errors, message);
      this.props.resetFlashMessages();
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
         <Form onSubmit={this.onSave} horizontal id="register">
           <FieldGroup
             id="name"
             type="text"
             label="Name"
             name="name"
             placeholder="Enter Name"
             value={this.props.values[name]}
             onChange={this.onChange}
             help={this.props.errors.name}
             className={this.getClasses(this.props.errors.name)}
           />
           <FieldGroup
             id="email"
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
             id="password"
             type="password"
             label="Password"
             name="password"
             placeholder="Enter Password"
             value={this.props.values[name]}
             onChange={this.onChange}
             help={this.props.errors.password}
             className={this.getClasses(this.props.errors.password)}
           />
           <FieldGroup
             id="passwordConfirmation"
             type="password"
             label="Password Confirmation"
             name="passwordConfirmation"
             placeholder="Enter Password"
             value={this.props.values[name]}
             onChange={this.onChange}
             help={this.props.errors.passwordConfirmation}
             className={this.getClasses(this.props.errors.passwordConfirmation)}
           />
           <FieldGroup
             id="timezone"
             label="Time Zone"
             name="timezone"
             placeholder="Select Time Zone"
             componentClass="select"
             defaultValue="Select Your Timezone"
             value={this.props.values[name]}
             onChange={this.onChange}
             help={this.props.errors.timezone}
             className={this.getClasses(this.props.errors.timezone)}
           >
             <option value="Select Your Timezone">Select Your Timezone</option>
             {
               map(timezones, (key, value) =>
               <option  key={key} value={key}>{value}</option>)
               }
             </FieldGroup>
             <FormGroup>
               <Col smOffset={3} sm={9}>
                 <Button type="submit"  disabled={this.props.isLoading}>
                   { this.props.isLoading ? 'Creating...' : 'Create New Account'}
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
		message: state.signup.message,
    isLoading: state.form.isLoading,
    values: state.form.values,
    errors:state.signup.errors
	};
}
function mapDispatchToProps(dispatch) {
  return {
   onSave: (values) => dispatch(registerUser(values)),
   onChange: (name, value) => dispatch(formUpdate(name, value)),
   registerUserFailure: (errors, message) => dispatch(registerUserFailure(errors, message)),
   addFlashMessage: (message) => dispatch(addFlashMessage(message)),
   resetFlashMessages:() => dispatch(resetFlashMessages())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
