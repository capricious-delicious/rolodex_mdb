import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Pane, Dialog, TextInput } from 'evergreen-ui';
import { useHistory, Link } from 'react-router-dom';
import { addContact } from '../../actions/contacts';
import { connect } from 'react-redux';

const Contacts = ({ addContact, contacts: { contacts, loading } }) => {
  const history = useHistory();

  const [modalState, setModalState] = useState({ isShown: false });

  const [formData, setFormData] = useState({
    name: '',
    context: '',
  });

  const { name, context } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    addContact(formData);
    // setModalState({ isShown: false });
  };

  return (
    <Fragment>
      <h2>Contacts</h2>
      <Pane>
        <Dialog
          isShown={modalState.isShown}
          title='Add contact'
          onCloseComplete={() => handleSubmit()}
          confirmLabel='Confirm'
        >
          <TextInput
            name='name'
            placeholder='Name...'
            value={name}
            onChange={(e) => onChange(e)}
            marginBottom={16}
          />
          <TextInput
            name='context'
            placeholder='Context...'
            value={context}
            onChange={(e) => onChange(e)}
          />
        </Dialog>

        <Button
          iconBefore='plus'
          onClick={() => setModalState({ isShown: true })}
          marginBottom={16}
        >
          Add Contact
        </Button>
      </Pane>
      <Table.Head>
        <Table.SearchHeaderCell />
        <Table.TextHeaderCell>Last Interaction</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {contacts.map((contact) => (
          <Table.Row
            key={contact._id}
            isSelectable
            onSelect={() => history.push(`/contacts/${contact._id}`)}
          >
            <Table.TextCell>{contact.name}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Fragment>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default connect(null, { addContact })(Contacts);
