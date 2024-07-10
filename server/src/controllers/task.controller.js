const User = require("../models/user.model")
const Task = require("../models/task.model")
const asyncHandler = require("../utils/asyncHandler")
const ApiResponse = require("../utils/ApiResponse")
const mongoose = require('mongoose');

const moment = require('moment');

// Function to get the start and end of the current week
const getWeekRange = () => {
    return {
      start: moment().startOf('week'),
      end: moment().endOf('week')
    };
  };
  

// Function to get the start and end of the current month
const getMonthRange = () => {
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');
  return { startOfMonth, endOfMonth };
};



const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, priority, assignedTo, dueDate, checklist , status } = req.body
    
        if(!title || !priority  || !checklist || !status) {
            return res.status(400).json({   
                success: false,
                message: "All fields are required"
            })
        }
    
        for(let check in checklist) {
            if(!checklist[check].item ) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required in checklist"
                })
            }
        }   
    
    
        const userId = req.userId;
    
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
    
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        
        const newTask = await Task.create({
            title,
            priority,
            assignedTo,
            dueDate,
            checklist,
            status,
            createdBy: userId
        })
    
        const savedTask = await newTask.save();

    

        if (assignedTo) {
            const user = await User.findOne({ email: assignedTo });
            user.tasks.push(savedTask._id);
            await user.save();
          }

          user.tasks.push(savedTask._id);
          await user.save();

          const loggedInUserId = req.userId;// Assuming you have the user ID from authentication
          let canEdit= true;
  
          if (loggedInUserId.toString() !== savedTask.createdBy.toString()) {
              canEdit = false; 
          }
  
  

    
        return res.status(201).json(
            new ApiResponse(
                200,
                {savedTask,canEdit},
                "Task Created successfully",
                true
            )
          );
   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    } 
})

const updateTask = asyncHandler(async (req, res) => {
    try {
        const { title, priority, assignedTo, dueDate, checklist, status } = req.body;
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Check if the logged-in user ID matches task.createdBy
        const loggedInUserId = req.userId;; // Assuming you have the user ID from authentication
        let canEdit= true;

        if (loggedInUserId.toString() !== task.createdBy.toString()) {
            canEdit = false; 
        }

        // Update task properties if provided in request body
        if (title) {
            task.title = title;
        }

        if(assignedTo)
        {
            task.assignedTo = assignedTo
        }

        if (priority) {
            task.priority = priority;
        }

        if (checklist) {
            task.checklist = checklist;
        }

        if (status) {
            task.status = status;
        }

        if (dueDate) {
            task.dueDate = dueDate;
        }

        if (assignedTo !== null) {
            // Remove task from old user's tasks
            if (task.assignedTo) {
                const oldUser = await User.findOne({ email: task.assignedTo });
                if (oldUser) {
                    oldUser.tasks = oldUser.tasks.filter(t => t.toString() !== taskId);
                    await oldUser.save();
                }
            }

            // Update task assignedTo and add task to new user's tasks
            task.assignedTo = assignedTo;
            const newUser = await User.findOne({ email: assignedTo });
            if (newUser) {
                newUser.tasks.push(taskId);
                await newUser.save();
            }
        }

        const updatedTask = await task.save();

        return res.status(200).json(
            new ApiResponse(200, {updatedTask, canEdit}, 'Tasks fetched successfully', true)
        );

      

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const getTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const filter = req.query.filter || 'week'; // Default filter is 'week'

        let dateRange;
        switch (filter) {
            case 'today':
                dateRange = {
                    start: moment().startOf('day'),
                    end: moment().endOf('day'),
                };
                break;
            case 'week':
                dateRange = {
                    start: moment().startOf('week').startOf('day'),
                    end: moment().endOf('week').endOf('day'),
                };
                break;
            case 'month':
                dateRange = {
                    start: moment().startOf('month').startOf('day'),
                    end: moment().endOf('month').endOf('day'),
                };
                break;
            default:
                return res.status(400).json({ message: 'Invalid filter' });
        }

        try {
            // Fetch user to get their tasks array
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Fetch tasks where the user's _id exists in the tasks array
            const tasks = await Task.find({
                _id: { $in: user.tasks }, // Assuming user.tasks contains ObjectIDs of tasks
                createdAt: {
                    $gte: dateRange.start.toDate(),
                    $lte: dateRange.end.toDate(),
                },
            });

            return res.status(200).json(
                new ApiResponse(200, tasks, 'Tasks fetched successfully', true)
            );
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


  const updateTaskStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const taskId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID",
            });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Update the task status
        task.status = status;
        const updatedTask = await task.save();

        // Check if the task is assigned to a user and update their tasks if necessary
        if (task.assignedTo) {
            const assignedUser = await User.findOne({ email: task.assignedTo });
            if (assignedUser) {
                assignedUser.tasks.forEach(userTask => {
                    if (userTask._id.toString() === task._id.toString()) {
                        userTask.status = status;
                    }
                });
                await assignedUser.save();
            }
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedTask,
                "Task status updated successfully",
                true
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

const updateChecklist = asyncHandler(async (req, res) => {
    try {
        const { checklistIndex, checked } = req.body;
        const taskId = req.params.id;
        
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (checklistIndex < 0 || checklistIndex >= task.checklist.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid checklist index"
            });
        }

        console.log('Before update:');
        console.log('Task:', task);
        console.log('Checklist:', task.checklist);

        // Update the specific checklist item's checked status
        if (task.checklist && task.checklist.length > checklistIndex) {
            task.checklist[checklistIndex].checked = checked;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid checklist index or checklist not found"
            });
        }

        const updatedTask = await task.save();

        // Check if the task is assigned to a user and update their checklist if necessary
        if (task.assignedTo) {
            const assignedUser = await User.findOne({ email: task.assignedTo });
            if (assignedUser) {
                assignedUser.tasks.forEach(userTask => {
                    if (userTask._id.toString() === task._id.toString()) {
                        if (userTask.checklist && userTask.checklist.length > checklistIndex) {
                            userTask.checklist[checklistIndex].checked = checked;
                        }
                    }
                });
                await assignedUser.save();
            }
        }

        console.log('After update:');
        console.log('Updated Task:', updatedTask);

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedTask,
                "Task checklist updated successfully",
                true
            )   
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"        
        });
    } 

});


const getTaskAnalytics = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const tasks = await Task.find({ createdBy: userId });

        const analytics = {
            backlogTasks: 0,
            todoTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
            lowPriorityTasks: 0,
            moderatePriorityTasks: 0,
            highPriorityTasks: 0,
            dueDateTasks: 0,
          };
      
          // Calculate the analytics
          tasks.forEach(task => {
            // Count tasks by status
            if (task.status === 'backlog') {
              analytics.backlogTasks++;
            } else if (task.status === 'todo') {
              analytics.todoTasks++;
            } else if (task.status === 'inProgress') {
              analytics.inProgressTasks++;
            } else if (task.status === 'done') {
              analytics.completedTasks++;
            }
      
            // Count tasks by priority
            if (task.priority === 'low') {
              analytics.lowPriorityTasks++;
            } else if (task.priority === 'moderate') {
              analytics.moderatePriorityTasks++;
            } else if (task.priority === 'high') {
              analytics.highPriorityTasks++;
            }
      
            // Count tasks with a due date
            if (task.dueDate) {
              analytics.dueDateTasks++;
            }
          });

          return res.status(200).json(
            new ApiResponse(
                200,
                analytics,
                "Analytics fetched successfully",
                true
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const deleteTask = asyncHandler(async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.userId; // Assuming userId is available in the request

        // Find the task to be deleted
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Check if the task is assigned to a user and remove it from their tasks array
        if (task.assignedTo) {
            const assignedUser = await User.findOne({ email: task.assignedTo });
            if (assignedUser) {
                assignedUser.tasks = assignedUser.tasks.filter(taskId => taskId.toString() !== task._id.toString());
                await assignedUser.save();
            }
        }

        // Remove the task from the current user's tasks array
        const currentUser = await User.findById(userId);
        if (currentUser) {
            currentUser.tasks = currentUser.tasks.filter(taskId => taskId.toString() !== task._id.toString());
            await currentUser.save();
        }

        // Delete the task from the Task collection
        await Task.findByIdAndDelete(taskId);

        return res.status(200).json(
            new ApiResponse(
                200,
                task,
                "Task deleted successfully",
                true
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

const getTaskById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                task,
                "Task fetched successfully",
                true
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
})

const viewTask = asyncHandler(async (req,res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                task,
                "Task fetched successfully",
                true
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

})
      

module.exports = {
    createTask,
    updateTask,
    getTask,
    updateTaskStatus,
    updateChecklist,
    getTaskAnalytics,
    deleteTask,
    getTaskById,
    viewTask
}