const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
};

const addTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ user: req.user._id, title });
  res.json(todo);
};

module.exports = { getTodos, addTodo }; 