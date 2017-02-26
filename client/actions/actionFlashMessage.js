import * as types from './actionTypes';

export function addFlashMessage(message) {
  return {
    type: types.ADD_FLASH_MESSAGE,
    message

  };
}
export function deleteFlashMessage(id) {
  return {
    type:types.DELETE_FLASH_MESSAGE,
    id,
  };
}
export function resetFlashMessages() {
  return {
    type:types.RESET_FLASH_MESSAGES
  };
}
