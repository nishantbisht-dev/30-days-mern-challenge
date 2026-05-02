const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
connectDB();
app.use(express.json());

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

const authRoutes = require('./routes/authRoutes')
app.use('/api/users', authRoutes)

// error middleware
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
