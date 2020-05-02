import React, { Fragment, useEffect, useState } from 'react';
import Contacts from './Contacts';
import { Pane } from 'evergreen-ui';
import axios from 'axios';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/contacts');
        setContacts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getContacts();
  }, [contacts, isLoading]);

  return (
    <Fragment>
      <Pane>
        <Contacts contacts={contacts} />
      </Pane>
    </Fragment>
  );
};

export default Dashboard;
