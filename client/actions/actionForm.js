import * as types from './actionTypes';
//synchronous action creators
export function isLoading(bool) {
  return {
    type: types.IS_LOADING,
    isLoading: bool
  };
}
export function  formReset() {
  return dispatch => dispatch({
     type: types.FORM_RESET
   });
}
export function formUpdate(name, value) {
return dispatch => dispatch({
    type: types.FORM_UPDATE_VALUE,
    name, //shorthand from name:name introduced in ES2016
    value
    });
}
/**
 * Your formUpdate doesn't return an
 *  action object but function which
 *   dispatches an action
 */
