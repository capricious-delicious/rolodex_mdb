const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../../models/Contact');
const request = require('request');
const config = require('config');
const User = require('../../models/User');

// @route   POST api/contacts
// @desc    Create a contact
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Contact name is required!').not().isEmpty(),
      check('context', 'Please provide some context.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // Create the new contact to be saved
      const newContact = new Contact({
        user: req.user.id,
        name: req.body.name,
        context: req.body.context,
      });

      // Save the new contact and return it
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   GET api/contacts
// @desc    Get all contacts for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET api/contacts/:id
// @desc    Get single contacts by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a single contact by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found.' });
    }

    // Check to make sure the user is trying to delete a contact they own

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    await contact.remove();

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found.' });
    }
    res.status(500).send('Server error.');
  }
});

// @route   POST api/contacts/interactions/:id
// @desc    Add an interaction for a contact
// @access  Private
router.post(
  '/interactions/:id',
  [
    auth,
    [
      // TODO: add ability to save custom date
      check('note', 'Enter some details.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const contact = await Contact.findById(req.params.id);

      // Make sure the user is updating their own contact.

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized.' });
      }

      const newInteraction = {
        note: req.body.note,
      };

      contact.interactions.unshift(newInteraction);
      await contact.save();

      res.json(contact.interactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   DELETE api/contacts/interactions/:id/:interaction_id
// @desc    Delete an interaction for a contact
// @access  Private
router.delete('/interactions/:id/:interaction_id', auth, async (req, res) => {
  try {
    // Make sure the user is deleting their own contact's interaction.
    const contact = await Contact.findById(req.params.id);

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    // Find the interaction to delete
    const interaction = contact.interactions.find(
      (interaction) => (interaction.id = req.params.interaction_id)
    );

    // Make sure it exists
    if (!interaction) {
      return res.status(404).json({ msg: 'Interaction not found.' });
    }

    // Remove it!
    await contact.interactions.pull(interaction.id);
    await contact.save();

    res.json({ msg: 'Interaction deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   PUT api/contacts/:id/update
// @desc    Update a contact's info
// @access  Private
router.put(
  '/:id/update',
  [
    auth,
    [
      check('number', 'Please enter a vaild phone number').matches(
        /^\d{7,11}$/
      ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const contact = await Contact.findById(req.params.id);

    // Make sure the user is updating their own contact.
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    const { twitter, facebook, linkedin, instagram, email, number } = req.body;
    //const infos = [twitter, facebook, linkedin, instagram, email, number];

    try {
      if (twitter) {
        contact.social.twitter = twitter;
      }
      if (facebook) {
        contact.social.facebook = facebook;
      }
      if (linkedin) {
        contact.social.linkedin = linkedin;
      }
      if (instagram) {
        contact.social.instagram = instagram;
      }
      if (email) {
        contact.contactinfo.email = email;
      }
      if (number) {
        contact.contactinfo.number = number;
      }

      await contact.save();
      await res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
