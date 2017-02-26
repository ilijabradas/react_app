import * as types from '../actions/actionTypes';
import shortid from 'shortid';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import findIndex from 'lodash/findIndex';

const INITIAL_STATE = {
    messages: []
};
const reducerFlashMessage = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_FLASH_MESSAGE:
            return { ...state,
                messages: [...state.messages, {
                    id: shortid.generate(),
                    style: action.message.style,
                    text: action.message.text
                }]
            };
        case types.RESET_FLASH_MESSAGES:
            return { ...state,
                messages: []
            };
        case types.DELETE_FLASH_MESSAGE:
            var index = findIndex(state.messages, {
                id: action.id
            });
            if (index >= 0) {
                return { ...state,
                    messages: [
                        ...state.messages.slice(0, index),
                        ...state.messages.slice(index + 1)
                    ]
                };
            }
            return state;
        default:
            return state;
    }
};
// const testaddFlashMessage = () => {
//     const stateBefore = {
//         messages:[]
//     };
//     const action = {
//         type: types.ADD_FLASH_MESSAGE,
//         id: '6754',
//         style: 'danger',
//         text: 'Lee Message for you!'
//     };
//     const stateAfter = {
//         messages:[
//           {
//             id:'6754',
//             style: 'danger',
//             text:'Lee Message for you!'
//           }
//         ]
//     };
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//     expect(
//         reducerFlashMessage(stateBefore, action)
//     ).toEqual(stateAfter);
// };
// testaddFlashMessage();
// console.log('Flash Message test');
export default reducerFlashMessage;
