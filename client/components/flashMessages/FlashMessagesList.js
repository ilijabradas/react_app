import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/actionFlashMessage';

class FlashMessagesList extends Component { //this is conected component cause we need data from store
  render() {
    const messages = this.props.messages.map(message =>
    <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
  );
  return (
    <div>{messages}</div>
    );
  }
}
function mapStateToProps(state) {
  return { //here we take a slice of global state
    messages: state.flash.messages //define this in root reducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteFlashMessage: (id) => dispatch(deleteFlashMessage(id))
  };
}
FlashMessagesList.propTypes = { //what this component will take
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  deleteFlashMessage: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagesList); //pass message from store to this component
