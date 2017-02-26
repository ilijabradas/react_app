import * as types from './actionTypes';
import axios from 'axios';
import { isLoading, formReset } from './actionForm';
import { addFlashMessage, resetFlashMessages } from './actionFlashMessage';
import { browserHistory } from 'react-router';

let _registerUserSuccess = (errors, message) => {
  return {
    type: types.REGISTER_USER_SUCCESS,
    message,
    errors
  };
};
export function registerUserFailure(errors, message) {
  return {
    type: types.REGISTER_USER_FAILURE,
    errors,
    message
  };//here i can put one object in arguments e.g notification
}  //and then access it values like action.notification.errors action.notification.message
let _hideNotifications = () => {
  return {
      type: types.HIDE_NOTIFICATION
  };
};

export function registerUser({
  timezone,
  name,
  email,
  password,
  passwordConfirmation
}) {
  return dispatch => {
    dispatch(isLoading(true));
    axios.post('/auth/signup', {
      timezone,
      name,
      email,
      password,
      passwordConfirmation
    })
    .then(response => {
      dispatch(_registerUserSuccess(response.data.errors, response.data.message));
      dispatch(isLoading(false));
      dispatch(resetFlashMessages());
      dispatch(addFlashMessage(response.data.message));
      dispatch(formReset());
      setTimeout(() => {
              // dispatch(_hideNotifications());
      }, 2000);
       document.getElementById('register').reset();
    })
    .catch(error => {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data.errors, error.response.data.message));
        dispatch(isLoading(false));
        dispatch(addFlashMessage(error.response.data.message));
      }
      else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.message);
      }
    });
  };
}
