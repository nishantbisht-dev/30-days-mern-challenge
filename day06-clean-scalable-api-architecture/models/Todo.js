const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    completed: {
      type: String,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Todo", todoSchema);
