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
  interactions: [],
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
      };
    case ADD_INTERACTION:
      return {
        ...state,
        loading: false,
      };
    case GET_INTERACTIONS:
      return {
        ...state,
        interactions: payload,
        loading: false,
      };
    case DELETE_INTERACTION:
    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
