import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class FlashMessage extends Component {

  deleteFlashMessage = () =>{
    this.props.deleteFlashMessage(this.props.message.id); //dispatch some action that it has on it props
  }
  render() {
    const { id, style, text } = this.props.message; //we can deconstruct message cause it is object
    return (
    <div className={classnames('alert', {
      'alert-success': style === 'success',
      'alert-danger': style === 'danger'
    })}
    >
    { text }
    <button className="close" onClick={this.deleteFlashMessage}><span>&times;</span></button>
    </div>
    );
  }
}
FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};
export default FlashMessage;
