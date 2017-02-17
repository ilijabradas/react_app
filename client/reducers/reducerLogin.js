import * as types from '../actions/actionTypes';


const INITIAL_STATE = {
  error:{},
};
const reducerSignin = (state = INITIAL_STATE , action) => {
  switch(action.type) {
      case types.LOGIN_USER_FAILURE:
      return { ...state, error: { login: action.payload }};
      case types.AUTH_USER:
      return { ...state,  error: {}, authenticated: true};
      case types.HIDE_NOTIFICATION:
      return { ...state , error:{} };
   }
      return state;
};
export default reducerSignin;
