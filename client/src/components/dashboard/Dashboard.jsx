import React, { Fragment, useEffect } from 'react';
import Contacts from './Contacts';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../actions/contacts';
import { Pane } from 'evergreen-ui';

const Dashboard = () => {
  return (
    <Fragment>
      <Pane>
        <Contacts />
      </Pane>
    </Fragment>
  );
};

export default Dashboard;
