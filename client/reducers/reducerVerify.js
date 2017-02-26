import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  message: {
    style:'',
    text:''
  }
};
const reducerVerify = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.VERIFY_USER_SUCCESS:
            return { ...state,
                message: action.message,
            };
        case types.VERIFY_USER_FAILURE:
            return { ...state,
                message: action.message,

            };
    }
    return state;
};
export default reducerVerify;
