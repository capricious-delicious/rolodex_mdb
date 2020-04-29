import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getContacts } from '../../actions/contacts';
import { connect } from 'react-redux';
import Contacts from './Contacts';
import { Pane, Spinner, Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';

const Dashboard = ({ getContacts, contacts }) => {
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Fragment>
      {contacts.loading ? (
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
          <Contacts contacts={contacts} />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getContacts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contactsReducer,
});

export default connect(mapStateToProps, { getContacts })(Dashboard);
