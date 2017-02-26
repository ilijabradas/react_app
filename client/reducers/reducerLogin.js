import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  errors:{
    email:'',
    password:''
  },
  message: {
    style:'',
    text:''
  },
  authenticated:false
};
const reducerSignin = (state = INITIAL_STATE , action) => {
  switch(action.type) {
      case types.LOGIN_USER_SUCCESS:
      return {  ...state,
        message: action.message,
        errors: {}
      };
      case types.LOGIN_USER_FAILURE:
      return { ...state,
        message: action.message,
        errors: action.errors
      };
      case types.AUTH_USER:
      return { ...state,  errors: {}, authenticated: true};
      case types.HIDE_NOTIFICATION:
      return { ...state,
              message:'',
              errors:{}
          };
   }
      return state;
};
export default reducerSignin;
