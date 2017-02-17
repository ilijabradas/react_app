import * as types from './actionTypes';
import axios from 'axios';
//synchronous action creators
let _isLoading = () => {
  return {
    type: types.IS_LOADING
  };
};
let _registerUserSuccess = (errors, message) => {
  return {
    type: types.SAVE_USER_SUCCESS,
    errors,
    message
  };
};
let _registerUserFailure = (errors, message) => {
  return {
    type: types.SAVE_USER_FAILURE,
    errors,
    message
  };
};
let _formReset = () => {
  return dispatch => dispatch({
     type: types.FORM_RESET
   });
};
export function formUpdate(name, value) {
return dispatch => dispatch({
    type: types.FORM_UPDATE_VALUE,
    name, //shorthand from name:name introduced in ES2016
    value
    });
}
export function registerUser({
  timezone,
  name,
  email,
  password,
  passwordConfirmation,
  isActive
}) {
  return (dispatch, getState) => {
    dispatch(_isLoading());
    axios.post('/auth/signup', {
      timezone,
      name,
      email,
      password,
      passwordConfirmation,
      isActive
    })
    .then(response => {
      dispatch(_registerUserSuccess(response.data.errors, response.data.message));
      dispatch(_formReset());
      let values = getState().form.values;
      values.name='';
    })
    .catch(error => {
      if (error.response) {
        dispatch(_registerUserFailure(error.response.data.errors, error.response.data.message));
      }
      else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.message);
      }
    });
  };
}

/**
 * Your formUpdate doesn't return an
 *  action object but function which
 *   dispatches an action
 */
