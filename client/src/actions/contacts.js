import axios from 'axios';
import {
  GET_CONTACTS,
  GET_CONTACT,
  ADD_CONTACT,
  ADD_INTERACTION,
  DELETE_CONTACT,
  DELETE_INTERACTION,
} from './types';

// Get all contacts of a user
export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get single contact by ID
export const getContactById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contacts/${id}`);
    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Create a new contact
export const addContact = ({ name, context }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, context });

  try {
    const res = await axios.post('/api/contacts', body, config);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add an interaction to a contact
export const addInteraction = ({ note, contact: { _id } }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ note });

  try {
    const res = await axios.post(
      `/api/contacts/interactions/${_id}`,
      body,
      config
    );
    dispatch({
      type: ADD_INTERACTION,
      payload: res.data,
    });
  } catch (err) {
    console.log('nope!' + err);
  }
};

// Delete an interaction for a contact
export const deleteInteraction = (props) => async (dispatch) => {
  const contact_id = props.contact._id;
  const interaction_id = props.interaction._id;
  try {
    console.log(contact_id);
    console.log(interaction_id);

    const res = await axios.delete(
      `/api/contacts/interactions/${contact_id}/${interaction_id}`
    );
    dispatch({
      type: DELETE_INTERACTION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete a contact
export const deleteContact = ({ contact }, history) => async (dispatch) => {
  const { _id } = contact;
  try {
    const res = await axios.delete(`/api/contacts/${_id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: res.data,
    });

    // @TODO improve this redirect
    // history.push('/dashboard');
  } catch (err) {
    console.log(err);
  }
};
