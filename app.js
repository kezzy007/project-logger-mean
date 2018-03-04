const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

// Connect to mongoose
mongoose.connect(config.database);

//  On mongoose db connection
mongoose.connection.on("connected", () => {
    console.log("connected");
});

const app = express();
const users = require('./routes/users');


// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => res.send("Home page here"));

app.use('/users', users);

const port = 3000;

app.listen(port, ()=> "Server is running");