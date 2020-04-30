import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TextInput, IconButton, Pane } from 'evergreen-ui';
import { addContact } from '../../actions/contacts';

const AddContactForm = (props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    context: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { name, context } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(formData));
    setFormData({ name: '', context: '' });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Pane
          display='flex'
          marginBottom={16}
          padding={5}
          background='blueTint'
          borderRadius={3}
        >
          <TextInput
            name='name'
            placeholder='Add a new contact...'
            value={name}
            onChange={(e) => onChange(e)}
            margin={5}
          />
          <TextInput
            name='context'
            placeholder='Add some context...'
            value={context}
            onChange={(e) => onChange(e)}
            margin={5}
          />
          <IconButton value='submit' type='submit' icon='plus' margin={5} />
        </Pane>
      </form>
    </Fragment>
  );
};
AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default AddContactForm;
