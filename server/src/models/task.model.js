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
            type: String,
            required: false,
        },
        assignedTo: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ['todo', 'inProgress', 'done', 'backlog'],
        },
        createdBy: {
            type: String,
            required: true,
        },
    }, { timestamps: true });



    module.exports = mongoose.model("Task", taskSchema);