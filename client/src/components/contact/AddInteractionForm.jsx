import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TextInput, IconButton, Pane } from 'evergreen-ui';
import { addInteraction } from '../../actions/contacts';

const AddInteractionForm = ({ contact }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    note: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { note } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInteraction({ note, contact }));
    setFormData({ note: '' });
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
            name='note'
            placeholder='Add a new interaction...'
            value={note}
            onChange={(e) => onChange(e)}
            margin={5}
          />
          <IconButton value='submit' type='submit' icon='plus' margin={5} />
        </Pane>
      </form>
    </Fragment>
  );
};
AddInteractionForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default AddInteractionForm;
