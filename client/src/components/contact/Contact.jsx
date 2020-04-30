import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById, deleteInteraction } from '../../actions/contacts';
import { Pane } from 'evergreen-ui';
import ContactActions from './ContactActions';
import ContactTop from './ContactTop';
import InteractionTable from './InteractionTable';
import AddInteractionForm from './AddInteractionForm';

const Contact = ({ match }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer);

  const { contact, loading } = contacts;

  useEffect(() => {
    dispatch(getContactById(match.params.id));
  }, [match.params.id, contact]);

  return (
    <Pane>
      <ContactTop contact={contact} />
      <AddInteractionForm contact={contact} />
      <InteractionTable contact={contact} />
      <ContactActions contact={contact} />
    </Pane>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContactById: PropTypes.func.isRequired,
};

export default Contact;
