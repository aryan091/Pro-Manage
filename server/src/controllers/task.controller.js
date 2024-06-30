const User = require("../models/user.model")
const Task = require("../models/task.model")
const asyncHandler = require("../utils/asyncHandler")
const ApiResponse = require("../utils/ApiResponse")
const ApiError = require("../utils/ApiError")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { decodeJwtToken , verifyToken } = require("../middlewares/verifyJwtToken")
const moment = require('moment');

// Function to get the start and end of the current week
const getWeekRange = () => {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  return { startOfWeek, endOfWeek };
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
            if(!checklist[check].item || !checklist[check].checked) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
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
            const user = await User.findById(assignedTo);
            user.tasks.push(savedTask._id);
            await user.save();
          }
    
    
        return res.status(201).json(
            new ApiResponse(
                200,
                savedTask,
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

        // Update title if provided
        if (title) {
            task.title = title;
        }

        // Update priority if provided
        if (priority) {
            task.priority = priority;
        }

        // Update checklist if provided
        if (checklist) {
            task.checklist = checklist;
        }

        // Update status if provided
        if (status) {
            task.status = status;
        }

        // Update dueDate if provided
        if (dueDate) {
            task.dueDate = dueDate;
        }

        // Update assigned user if provided
        if (assignedTo) {
            // Remove task from current assigned user's tasks
            if (task.assignedTo) {
                const oldUser = await User.findById(task.assignedTo);
                oldUser.tasks = oldUser.tasks.filter(t => t.toString() !== taskId);
                await oldUser.save();
            }

            // Assign to new user and add task to their tasks
            task.assignedTo = assignedTo;
            const newUser = await User.findById(assignedTo);
            newUser.tasks.push(taskId);
            await newUser.save();
        }

        const updatedTask = await task.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedTask,
                "Task updated successfully",
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

const getTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const filter = req.query.filter || 'week'; // Default filter is 'week'

        let dateRange;
      
        switch (filter) {
          case 'today':
            dateRange = {
              start: moment().startOf('day'),
              end: moment().endOf('day')
            };
            break;
          case 'week':
            dateRange = getWeekRange();
            break;
          case 'month':
            dateRange = getMonthRange();
            break;
          default:
            return res.status(400).json({ message: 'Invalid filter' });
        }
        try {
            const tasks = await Task.find({
              createdBy: userId,
              dueDate: {
                $gte: dateRange.start.toDate(),
                $lte: dateRange.end.toDate()
              }
            });

            return res.status(200).json(
              new ApiResponse(
                200,
                tasks,
                "Tasks fetched successfully",
                true
              )
            );
          } catch (error) {
            console.log(error); 
            return res.status(500).json({ message: 'Internal server error' });
          }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
              
const updateTaskStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const taskId = req.params.id;
        
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        task.status = status;


        const assignedUser = await User.findById(task.assignedTo); // Assuming assignedTo holds the user ID
        if (assignedUser) {
            // Update user's view of the task (could update status or any other relevant field)
            const taskIndex = assignedUser.tasks.findIndex(task => task.taskId.toString() === taskId.toString());
            if (taskIndex !== -1) {
                assignedUser.tasks[taskIndex].status = status;
            }
        }

        const updatedTask = await task.save();


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
            message: "Internal server error"
        });
    } 
});

const updateChecklist = asyncHandler(async (req, res) => {
    try {
        const { checklist } = req.body;
        const taskId = req.params.id;
        
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        task.checklist = checklist;
        const updatedTask = await task.save();
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

cpnst deleteTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        await task.remove();
        return res.status(200).json(
            new ApiResponse(
                200,
                task,
                "Task deleted successfully",
                true
            )
        ) 
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
      

module.exports = {
    createTask,
    updateTask,
    getTask,
    updateTaskStatus,
    updateChecklist,
    getTaskAnalytics,
    deleteTask,
    getTaskById
}