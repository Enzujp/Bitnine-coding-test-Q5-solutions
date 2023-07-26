const express = require("express");
// const bodyParser = require("bodyParser");
// const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//Connect to MongoDB
const dbURI = 'mongodb+srv://enzu:jessedavid@cluster0.yjojpvv.mongodb.net/'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true })
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err));

const port = 3000; //The server would run on this port

//Initializing Server
app.listen(port, () => console.log(`This app runs on port ${port}.`))

// app.use(bodyParser.urlencoded({extended:false}));

//Homepage Route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
})

//Route to the signup page
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/static/signup.html')
})

//Route to Login page
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/static/login.html')
})


app.post('/login', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
})