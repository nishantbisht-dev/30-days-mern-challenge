const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");
app.use('/api/notes', noteRoutes)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
