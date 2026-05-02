const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.get("/", protect, getTodos);
router.post("/", protect, addTodo);
router.delete("/:id", protect, deleteTodo);
router.put("/:id", protect, updateTodo);
module.exports = router;
