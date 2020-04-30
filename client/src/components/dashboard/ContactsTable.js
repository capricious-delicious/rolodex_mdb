import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';

const ContactsTable = ({ contacts: { contacts } }) => {
  const history = useHistory();
  return (
    <Fragment>
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
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

ContactsTable.propTypes = {};

export default ContactsTable;
