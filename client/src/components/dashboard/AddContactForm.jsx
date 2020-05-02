import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, IconButton, Pane } from 'evergreen-ui';
import axios from 'axios';

const AddContactForm = () => {
  //
  const addContact = async ({ name, context }) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, context });

    try {
      const res = await axios.post('/api/contacts', body, config);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    context: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { name, context } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(formData);
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
