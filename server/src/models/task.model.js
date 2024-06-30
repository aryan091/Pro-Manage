const mongoose = require('mongoose');

    const taskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ['high', 'moderate', 'low'],
            required: true,
        },
        checklist: {
            type: [
                {
                    item: { type: String, required: true },
                    checked: { type: Boolean, required: true },
                },
            ],
            required: true,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        assignedTo: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done', 'backlog'],
            default: 'todo'
        },
        createdBy: {
            type: String,
            required: true,
        },
    }, { timestamps: true });

    Task = mongoose.model('Task', taskSchema);


module.exports = Task;
