const mongoose = require("mongoose");

// Create a User Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
});

// Create a contact model using the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
