import { combineReducers } from 'redux';
import reducerRegister from './reducerRegister';
import reducerLogin from './reducerLogin';
import reducerForm from './reducerForm';
import reducerVerify from './reducerVerify';
import reducerFlashMessage from './reducerFlashMessage';

const rootReducer = combineReducers({
  signup: reducerRegister,
  signin: reducerLogin,
  form: reducerForm,
  verify: reducerVerify,
  flash: reducerFlashMessage
});

export default rootReducer;
