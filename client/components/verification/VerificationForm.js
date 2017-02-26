import React, {Component}  from 'react';
import styles from '../formElements/formElements.scss';
import { Form, FormControl, Col, Button, FormGroup, Alert, Jumbotron } from 'react-bootstrap';
import classnames from 'classnames';

class VerificationForm extends Component { //if component have state it needs to be class
    constructor(props) {
        super(props);
    }
    onSave = (event) => {
      event.preventDefault();
      this.props.onSave();
    }

    render() {
        return (
         <Form onSubmit={this.onSave} horizontal>
         <Jumbotron>
           <p>Please, click on button below to verify your account</p>
           <FormGroup>
              <Col sm={12}>
                <Button type="submit" bsStyle="warning" disabled={this.props.isLoading}>
                  { this.props.isLoading ? 'Processing...' : 'Verify Account'}
                </Button>
              </Col>
            </FormGroup>
             <FormGroup>
               <Col sm={12}>
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
            </Jumbotron>
               </Form>
        );
    }
}
export default VerificationForm;
