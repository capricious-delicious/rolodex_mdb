import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button, Pane, Dialog, TextInput } from 'evergreen-ui';
import {
  addInteraction,
  deleteContact,
  getContactById,
} from '../../actions/contacts';
import { useDispatch, useSelector } from 'react-redux';

const ContactActions = ({ history }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contactsReducer.contact);

  const [modalState, setModalState] = useState({ isShown: false });
  const [formData, setFormData] = useState({
    note: '',
  });

  // Redirect after deleting contact
  const [toHome, setToHome] = useState(false);

  const { note } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    dispatch(addInteraction({ note, contact }));
  };

  const handleDelete = () => {
    dispatch(deleteContact({ history, contact }));
    setToHome(true);
  };

  return (
    <Fragment>
      {toHome && <Redirect to='/dashboard' />}
      <Pane>
        <Dialog
          isShown={modalState.isShown}
          title='Add interaction'
          onCloseComplete={() => handleSubmit()}
          confirmLabel='Confirm'
        >
          <TextInput
            name='note'
            placeholder='Note...'
            value={note}
            onChange={(e) => onChange(e)}
            marginBottom={16}
          />
        </Dialog>
      </Pane>
      <Button is={Link} iconBefore='arrow-left' to='/dashboard'>
        Back
      </Button>
      <Button
        iconBefore='plus'
        onClick={() => setModalState({ isShown: true })}
      >
        Add Interaction
      </Button>
      <Button
        intent='danger'
        onSelect={() => handleDelete()}
        iconBefore='trash'
      >
        Delete Contact
      </Button>
    </Fragment>
  );
};

export default withRouter(ContactActions);
