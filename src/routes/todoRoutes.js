const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodo,
  deleteTodoById,
  updateTodoById
} = require("../controllers/todoController");

const protect = require("../middlewares/authMiddleware");

router.post('/createTodo', protect, createTodo);
router.get('/getAllTodo', protect, getAllTodo);
router.delete('/deleteTodo/:id', protect, deleteTodoById);
router.put('/updateTodo/:id', protect, updateTodoById);
router.patch('/updateTodo/:id', protect, updateTodoById);

module.exports = router;
