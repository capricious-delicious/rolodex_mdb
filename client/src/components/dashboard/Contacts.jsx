import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import ContactsTable from './ContactsTable';
import AddContactForm from './AddContactForm';

const Contacts = ({ contacts }) => {
  return (
    <Fragment>
      <Pane>
        <h2>Contacts</h2>
        <AddContactForm />
        <ContactsTable contacts={contacts} />
      </Pane>
    </Fragment>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
