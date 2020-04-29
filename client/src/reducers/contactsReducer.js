import {
  GET_CONTACTS,
  GET_CONTACT,
  ADD_CONTACT,
  ADD_INTERACTION,
  DELETE_CONTACT,
  DELETE_INTERACTION,
  GET_INTERACTIONS,
} from '../actions/types';

const initialState = {
  contacts: [],
  contact: null,
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        contact: null,
        loading: false,
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        loading: false,
        contact: null,
      };
    case DELETE_INTERACTION:
    case ADD_INTERACTION:
    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
