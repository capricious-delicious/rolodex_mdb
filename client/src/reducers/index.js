import { combineReducers } from 'redux';
import auth from './auth';
import contactsReducer from './contactsReducer';

const appReducer = combineReducers({
  auth,
  contactsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
