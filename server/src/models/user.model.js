const mongoose = require('mongoose');

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true  
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
}, { timestamps: true });

// Create the model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
