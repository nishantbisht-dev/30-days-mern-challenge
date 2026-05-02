const mongoose = require("mongoose");
const Todo = require("../models/Todo");

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching todos" });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const todo = await Todo.create({ user: req.user._id, title });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding todo" });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      console.log("Invalid ObjectId:", todoId);
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    if (!req.user) {
      console.log("req.user is undefined. Token missing or invalid");
      return res.status(401).json({ message: "Not authorized" });
    }

    const todo = await Todo.findOne({ _id: todoId, user: req.user._id });

    if (!todo) {
      console.log("Todo not found for user:", req.user._id);
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne(); // safer than .remove()
    console.log("Todo deleted:", todoId);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Server error deleting todo" });
  }
};

// Toggle todo completion
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (req.body.title !== undefined) {
    todo.title = req.body.title;
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  const updated = await todo.save();
  res.json(updated);
};
