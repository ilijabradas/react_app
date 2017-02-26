import React, {PropTypes} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col} from 'react-bootstrap';
import styles from './formElements.scss';

const FieldGroup = ({ id, label, help, className, ...props }) => {
  return (
    <FormGroup controlId={id} className={className}>
        <Col componentClass={ControlLabel} sm={3} className={styles.left}>
            {label}
        </Col>
        <Col sm={9}>
            <FormControl {...props}/>
        </Col>
          <Col sm={9} smPush={3}>
          {help && <HelpBlock>{help}</HelpBlock>}
          </Col>
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  prop:PropTypes.array,
  className:PropTypes.string.isRequired
};
export default FieldGroup;
