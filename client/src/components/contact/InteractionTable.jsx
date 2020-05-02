import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Menu, IconButton, Spinner } from 'evergreen-ui';
import Moment from 'react-moment';
import axios from 'axios';

const InteractionTable = ({ contact }) => {
  //
  const deleteInteraction = async (props) => {
    const contact_id = props.contact._id;
    const interaction_id = props.interaction._id;
    try {
      axios.delete(
        `/api/contacts/interactions/${contact_id}/${interaction_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  function handleDeleteInteraction(interaction) {
    deleteInteraction({ interaction, contact });
  }

  return (
    <Fragment>
      {!contact ? (
        <Spinner />
      ) : (
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Date</Table.TextHeaderCell>
            <Table.TextHeaderCell>Note</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {contact.interactions.map((interaction) => (
              <Table.Row key={interaction._id}>
                <Table.TextCell>
                  <Moment date={interaction.date} format='YYYY/MM/DD' />
                </Table.TextCell>
                <Table.TextCell>{interaction.note}</Table.TextCell>
                <Table.Cell width={48} flex='none'>
                  <Popover
                    content={
                      <Menu.Group>
                        <Menu.Item
                          intent='danger'
                          onSelect={handleDeleteInteraction.bind(
                            this,
                            interaction
                          )}
                        >
                          Delete...
                        </Menu.Item>
                      </Menu.Group>
                    }
                    shouldCloseOnExternalClick={true}
                  >
                    <IconButton icon='more' height={24} appearance='minimal' />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Fragment>
  );
};

InteractionTable.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default InteractionTable;
