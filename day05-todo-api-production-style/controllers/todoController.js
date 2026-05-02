const Todo = require("../models/Todo");

// GET all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// CREATE todo (with validation)
exports.createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const todo = new Todo({ title });
  await todo.save();

  res.status(201).json(todo);
};

// UPDATE todo
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!todo) {
    return res.status(404).json({
      message: "Todo note found",
    });
  }
  res.json(todo);
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  res.json({
    message: "Todo deleted",
  });
};
