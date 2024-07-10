const mongoose = require('mongoose');

// Define the schema for tasks
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  board: [
    {
      type: String, // Store email as a string in board array
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
