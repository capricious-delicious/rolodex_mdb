import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button } from 'evergreen-ui';
import { deleteContact } from '../../actions/contacts';

const ContactActions = ({ contact }) => {
  const [toHome, setToHome] = useState(false);

  const handleDelete = () => {
    deleteContact({ contact });
    setToHome(true);
  };

  return (
    <Fragment>
      {toHome && <Redirect to='/dashboard' />}
      <Button is={Link} iconBefore='arrow-left' to='/dashboard'>
        Back
      </Button>
      <Button intent='danger' onClick={handleDelete} iconBefore='trash'>
        Delete Contact
      </Button>
    </Fragment>
  );
};

export default withRouter(ContactActions);
