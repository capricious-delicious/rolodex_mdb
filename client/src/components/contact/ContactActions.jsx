import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button, Pane, Dialog, TextInput } from 'evergreen-ui';
import { addInteraction, deleteContact } from '../../actions/contacts';
import { useDispatch, useSelector } from 'react-redux';

const ContactActions = ({ contact }) => {
  const dispatch = useDispatch();

  // Redirect after deleting contact
  const [toHome, setToHome] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact({ contact }));
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
