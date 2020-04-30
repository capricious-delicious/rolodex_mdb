import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pane, Spinner } from 'evergreen-ui';
import ContactsTable from './ContactsTable';
import AddContactForm from './AddContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../actions/contacts';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer);
  const loading = contacts.loading;

  useEffect(() => {
    dispatch(getContacts());
  }, [contacts, loading]);

  return (
    <Fragment>
      {contacts === null ? (
        <Pane
          display='flex'
          alignItems='center'
          justifyContent='center'
          height={400}
        >
          <Spinner />
        </Pane>
      ) : (
        <Fragment>
          <Pane>
            <h2>Contacts</h2>
            <AddContactForm />
            <ContactsTable contacts={contacts} />
          </Pane>
        </Fragment>
      )}
    </Fragment>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
