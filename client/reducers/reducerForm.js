import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
    values: {
        timezone: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        name: '',
        isActive:0
    },
    errors: {
        timezone: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        name: ''
    },
    message: '',
    isLoading: false
};
const reducerForm = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FORM_UPDATE_VALUE:
            return { ...state,
                values: { ...state.values,
                    [action.name]: action.value,
                }
            };
        case types.FORM_RESET:
            return { ...state, errors:{}, values:{}};
        case types.IS_LOADING:
            return { ...state,
                isLoading: true
            };
        case types.SAVE_USER_SUCCESS:
            return { ...state,
                isLoading: false,
                message: action.message,
                errors: {}
            };
        case types.SAVE_USER_FAILURE:
            return { ...state,
                isLoading: false,
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
export default reducerForm;
