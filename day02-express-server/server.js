const express = require('express');

const app = express();

// Middleware 
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Express Server'
    })
})

app.get('/about', (req, res) => {
    res.json({
        project: 'Day 2 - Express Server',
        message: 'Nishant Bisht'
    })
})

// POST route
app.post('/data', (req, res) => {
    const data = req.body;

    res.json({
        message: 'Data received successfully',
        data: data
    })
})

// Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})