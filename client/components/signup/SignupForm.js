import React, {Component}  from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import map from 'lodash/map';
import timezones from '../../data/timezones';
import styles from '../formElements/formElements.scss';
import {formUpdate, registerUser}   from '../../actions/actionForm';
import FieldGroup from '../formElements/FieldGroup';
import { Form, FormControl, Col, Checkbox, Button, FormGroup, Label } from 'react-bootstrap';
import classnames from 'classnames';


// {... props} passing large number of props wrap in object with spread notation
class SignupForm extends Component { //if component have state it needs to be class
    constructor(props) {
        super(props);
    }
    onChange = (event, index, value) => {
       this.props.onChange(event.target.name, event.target.value);
    };
    onSave = (event) => {
        event.preventDefault();
        this.props.onSave(this.props.values);
    }
    getClasses(field) {
    return classnames({
      'has-error': field
    });
  }
    render() {
        return (
					// this.props.handleSubmit is created by reduxForm()
         // if the form is valid, it will call this.props.onSubmit
         <Form onSubmit={this.onSave} horizontal>
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
               <Col smOffset={4} sm={8}>
                 <Checkbox>Remember me</Checkbox>
               </Col>
             </FormGroup>
             <FormGroup>
               <Col smOffset={4} sm={8}>
                 <Button type="submit"  disabled={this.props.isLoading}>
                   { this.props.isLoading ? 'Creating...' : 'Create New Account'}
                 </Button>
               </Col>
             </FormGroup>
             <FormGroup>
               <Col smOffset={4} sm={8}>
             {this.props.message &&
               <div className="alert alert-info">{this.props.message}</div>}
               </Col>
             </FormGroup>
               </Form>
             //this.setState({ disabled: true });
            //this.props.errorMessage.register == this.props = {errorMessage :{ register: ''}}
        );
    }
}
const validate = values => {
  const errors = {};
  const fields = ['name', 'email', 'password', 'passwordConfirmation', 'timezone'];
  fields.forEach((f) => {
    if(!(f in values)) {
      errors[f] = `${f} is required`;
    }
  });
  return errors;
};
function mapStateToProps(state) {
	return {
		message: state.form.message,
    isLoading: state.form.isLoading,
    values: state.form.values,
    errors:state.form.errors

	};
}
function mapDispatchToProps(dispatch) {
  return {
   onSave: (values) => dispatch(registerUser(values)),
   onChange: (name, value) => dispatch(formUpdate(name, value))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
