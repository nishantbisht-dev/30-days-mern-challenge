const express = require("express");
const router = express.Router();
const { getTodos, addTodo } = require("../controllers/todoController"); // ✅ correct
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getTodos); // must be a function
router.post("/", protect, addTodo); // must be a function

module.exports = router;