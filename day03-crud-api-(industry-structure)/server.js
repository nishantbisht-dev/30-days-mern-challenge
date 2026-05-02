const express = require("express");

const app = express();

const noteRoutes = require("./routes/noteRoutes");

app.use(express.json());

// Use routes
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
