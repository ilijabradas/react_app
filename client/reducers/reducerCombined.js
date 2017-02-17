import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerForm from './reducerForm';

const rootReducer = combineReducers({
  signin: reducerLogin,
  form: reducerForm
});

export default rootReducer;
