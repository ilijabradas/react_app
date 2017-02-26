import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
    errors: {
        timezone: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        name: ''
    },
    message: {
      style:'',
      text:''
    }
};
const reducerRegister = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.REGISTER_USER_SUCCESS:
            return { ...state,
                message: action.message,
                errors: {}
            };
        case types.REGISTER_USER_FAILURE:
            return { ...state,
              message: action.message,
              errors: action.errors
            };
        case types.HIDE_NOTIFICATION:
            return { ...state,
                message: '',
                errors: {}
            };
    }
    return state;
};
export default reducerRegister;
