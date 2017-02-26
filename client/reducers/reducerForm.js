import * as types from '../actions/actionTypes';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const INITIAL_STATE = {
    values: {
        timezone: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        name: ''
    },
    isLoading: false
};
const reducerForm = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FORM_UPDATE_VALUE:
            return { ...state,
                values: { ...state.values,
                    [action.name]: action.value, //name and value copied from the action object
                }
            };
        case types.FORM_RESET:
            return { ...state,
                errors: {},
                values: {
                  timezone: '',
                  password: '',
                  passwordConfirmation: '',
                  email: '',
                  name: ''
                }
            };
        case types.IS_LOADING:
            return { ...state,
                isLoading: action.isLoading
            };
    }
    return state;
};
const testformUpdateValue = () => {
    const stateBefore = {
        values: {}
    };
    const action = {
        type: types.FORM_UPDATE_VALUE,
        name: 'name',
        value: 'Lee'
    };
    const stateAfter = {
        values: {
            name: 'Lee'
        }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        reducerForm(stateBefore, action)
    ).toEqual(stateAfter);
};
testformUpdateValue();
console.log('All test passed');
export default reducerForm;
