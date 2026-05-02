require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
const cors = require("cors");

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start server
app.listen(process.env.PORT || 5000, () => console.log("Server is running..."));