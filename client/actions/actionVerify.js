import * as types from './actionTypes';
import axios from 'axios';
import { isLoading} from './actionForm';
import { browserHistory } from 'react-router';
import { addFlashMessage } from './actionFlashMessage';

let _verifyUserSuccess = (message) => {
  return {
    type: types.VERIFY_USER_SUCCESS,
    message
  };
};
let _verifyUserFailure = (message) => {
  return {
    type: types.VERIFY_USER_FAILURE,
    message
  };//here i can put one object in arguments e.g notification
};  //and then access it values like action.notification.errors action.notification.message

export function verifyUser(token) {
  return dispatch => {
    dispatch(isLoading(true));
    axios.get('/auth/verify/' + token)
    .then(response => {
      dispatch(_verifyUserSuccess(response.data.message));
      dispatch(addFlashMessage(response.data.message));
      dispatch(isLoading(false));
      //  browserHistory.push('/signin');
    })
    .catch(error => {
      if (error.response) {
        dispatch(_verifyUserFailure(error.response.data.message));
        dispatch(addFlashMessage(error.response.data.message));
        dispatch(isLoading(false));
      }
      else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.message);
      }
    });
  };
}
