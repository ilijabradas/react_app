import axios from 'axios';
import * as types from './actionTypes';
import { browserHistory } from 'react-router';
import {
    reset
} from 'redux-form';
//synchronous action creators
let _loginUserFailure = (payload) => {
    return {
        type: types.LOGIN_USER_FAILURE,
        payload
    };
};
let _authUser = () => {
  return {
    type: types.AUTH_USER
  };
};
let _hideNotification = (payload) => {
    return {
        type: types.HIDE_NOTIFICATION,
        payload: ''
    };
};

//asynchronous helpers
export function loginUser({
    password,
    email
}) {
    return dispatch => {
        axios.post('/auth/login', {
                    password,
                    email
                })
            .then(axios.spread(res => {
                dispatch(_authUser());
                //  browserHistory.push('/');
            }))
            .catch(res => {
                dispatch(_loginUserFailure(res.data.message)); //BE validation and passport error message
                setTimeout(() => {
                    dispatch(_hideNotification(res.data.message));
                }, 10000);
            });
    };
}
