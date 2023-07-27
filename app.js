const express = require('express');
const app = express();

const { render } = require('ejs');
const mongoose = require('mongoose');

const flash = require("connect-flash");

const path = require("path");
const templatePath = path.join(__dirname, '../templates');
const collection = require("./mongodb");
const { request } = require('http');

//connect to mongodb
const dbURL = "mongodb+srv://enzu:WTTRpJl5yhlpwjKN@cluster0.0bakznq.mongodb.net/"
mongoose.connect(dbURL)
    .then((result) => app.listen(3000), () => {
        console.log("everything works!")    
    })// app.listen is moved on to ensure we listen for requests only after connection is made 
    // remember to whitelist ip addresses on mongodb to allow access
    .catch((err) => console.log(err));
// register view engine 

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));

app.use(flash);



app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/signup', (req,res)=> {
    res.render('signup');
})

app.post('/signup', async(req,res)=> {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data]);

    request.flash('message', 'You have signed up Successfully!');

    res.redirect('login') // takes user to login page after signing up
})

app.post('/login', async (req, res) => {
    try {
        const checkDetails = await collection.findOne({
            name: req.body.name
        })

        if (checkDetails.password === req.body.password) {
            res.render(index);
        }
        else {
            res.send("Incorrect Password");
        }
    }
    catch {
        res.send("Incorrect Details")

    }
})

app.get('/login', (req, res)=> {
    res.render('login.ejs');
})