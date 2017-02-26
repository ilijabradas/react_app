import * as types from './actionTypes';
import axios from 'axios';
import { isLoading, formReset } from './actionForm';
import { browserHistory } from 'react-router';
import { addFlashMessage } from './actionFlashMessage';

//synchronous action creators
let _loginUserSuccess = (errors, message) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    errors,
    message
  };
};
export function loginUserFailure(errors, message) {
  return {
    type: types.LOGIN_USER_FAILURE,
    errors,
    message
  };
}
let _authUser = () => {
  return {
    type: types.AUTH_USER
  };
};
//asynchronous helpers
export function loginUser({
    password,
    email
}) {
    return dispatch => {
        axios.post('/auth/signin', {
                    password,
                    email
                })
            .then(response => {
              dispatch(_loginUserSuccess(response.data.errors, response.data.message));
              dispatch(addFlashMessage(response.data.message));
              dispatch(formReset());
              // dispatch(_authUser());
              // browserHistory.push('/');
              document.getElementById('login').reset();
            })
            .catch(error => {
              if (error.response) {
                dispatch(loginUserFailure(error.response.data.errors,error.response.data.message)); //BE validation and passport error message
                dispatch(addFlashMessage(error.response.data.message));
              }
              else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message);
              }
            });
    };
}
