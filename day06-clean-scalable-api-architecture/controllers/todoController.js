const Todo = require("../models/Todo");
const asyncHandler = require("../middleware/asyncHandler");

// GET all todos
exports.getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// CREATE todo
exports.createTodo = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        res.status(400);
        throw new Error("Title is required");
    }

    const todo = await Todo.create({ title });

    res.status(201).json(todo);
});

// UPDATE todo
exports.updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
});

// DELETE todo
exports.deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    await todo.deleteOne();

    res.json({ message: "Todo deleted" });
});