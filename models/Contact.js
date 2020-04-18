const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  contactinfo: {
    email: {
      type: String,
      required: false,
      unique: false,
    },
    number: {
      type: Number,
      required: false,
      unique: false,
    },
  },
  context: {
    type: String,
    required: true,
  },
  interactions: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      note: {
        type: String,
        // TODO: make this required
        required: false,
      },
    },
  ],
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
