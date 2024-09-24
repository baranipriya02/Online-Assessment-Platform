// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create express app
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://priyarajamani2004:Ph0n1x0ne@cluster1.cn1ax.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static HTML files from the "views" folder
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/auth', require('./routes/auth'));

// Set up port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
