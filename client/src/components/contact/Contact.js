import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactById,
  deleteInteraction,
  addInteraction,
} from '../../actions/contacts';
import { Table, Spinner, Pane, Popover, IconButton, Menu } from 'evergreen-ui';
import ContactActions from './ContactActions';
import Moment from 'react-moment';

const Contact = ({ match }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer);

  const { contact, loading } = contacts;

  useEffect(() => {
    dispatch(getContactById(match.params.id));
  }, [getContactById, contact]);

  function handleDeleteInteraction(interaction) {
    dispatch(deleteInteraction({ interaction, contact }));
  }

  return (
    <Fragment>
      {contact === null || loading ? (
        <Pane
          display='flex'
          alignItems='center'
          justifyContent='center'
          height={400}
        >
          <Spinner />
        </Pane>
      ) : (
        <Table>
          <h2>{contact.name}</h2>
          <h5>{contact.context}</h5>
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
      <ContactActions />
    </Fragment>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContactById: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   contacts: state.contactsReducer,
// });

// export default connect(mapStateToProps, { getContactById })(Contact);

export default Contact;
