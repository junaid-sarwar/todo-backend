const TodoModel = require("../models/TodoModel.js");

const createTodo = async (req, res) => {
    const { title, completed, priority } = req.body;
  
    try {
      const todo = new TodoModel({
        title,
        completed,
        priority,
      });
  
      await todo.save();
      res.status(201).json({
        message: 'Todo created successfully',
        success: true,
        data: todo
      });
    } catch (err) {
      console.error("Error creating todo:", err);
      res.status(500).json({
        message: 'Failed to create todo',
        success: false,
        error: err.message
      });
    }
  };  

// Get all Todos
const getAllTodo = async (req, res) => {
    const { priority } = req.query;

    try {
        let query = {};
        if (priority) query.priority = priority; // Filter by priority

        const data = await TodoModel.find(query).sort({ createdAt: -1 }); // Sorting by date

        res.status(200).json({
            message: 'Todos fetched successfully',
            success: true,
            data
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to load todos',
            success: false,
            error: err.message
        });
    }
};

// Update Todo by ID
const updateTodoById = async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Todo",
            success: false,
            error: error.message
        });
    }
};

const deleteTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await TodoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found', success: false });
        }

        res.status(200).json({
            message: 'Todo deleted successfully',
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete todo',
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    createTodo,
    getAllTodo,
    updateTodoById,
    deleteTodoById
};
