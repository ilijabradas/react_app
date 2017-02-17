import React, {PropTypes} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col} from 'react-bootstrap';

function FieldGroup({ id, label, help, className, ...props }) {
  return (
    <FormGroup controlId={id} className={className}>
        <Col componentClass={ControlLabel} sm={4}>
            {label}
        </Col>
        <Col sm={8}>
            <FormControl {...props}/>
        </Col>
          <Col sm={8} smPush={4}>
          {help && <HelpBlock>{help}</HelpBlock>}
          </Col>
    </FormGroup>
  );
}

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  prop:PropTypes.array
};
export default FieldGroup;
