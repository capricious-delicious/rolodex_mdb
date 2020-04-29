import { combineReducers } from 'redux';
import auth from './auth';
import contactsReducer from './contactsReducer';

export default combineReducers({
  auth,
  contactsReducer,
});
