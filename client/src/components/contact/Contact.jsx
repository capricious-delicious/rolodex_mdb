import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import ContactActions from './ContactActions';
import ContactTop from './ContactTop';
import InteractionTable from './InteractionTable';
import AddInteractionForm from './AddInteractionForm';
import axios from 'axios';

const Contact = ({ match }) => {
  const [contact, setContact] = useState(null);

  const getContactById = async () => {
    try {
      const res = await axios.get(`/api/contacts/${match.params.id}`);
      setContact(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContactById();
  }, [contact]);

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
