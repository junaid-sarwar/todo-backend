const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodo,
  deleteTodoById,
  updateTodoById
} = require("../controllers/todoController");

router.post('/createTodo', createTodo);

router.get('/getAllTodo', getAllTodo);

router.delete('/deleteTodo/:id', deleteTodoById);

router.put('/updateTodo/:id', updateTodoById);
router.patch('/updateTodo/:id', updateTodoById);

module.exports = router;
