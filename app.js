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
const dbURL = "mongodb+srv://johnpaul:jessedavid@cluster0.0bakznq.mongodb.net//";
mongoose.connect(dbURL)
    .then(() => app.listen(3000), () => {
        console.log("This app run on port 3000!")    
    })
    .catch((err) => console.log(err));
// register view engine 

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.use(flash());



app.get('/', (req, res) => {
    res.render('index');
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
            res.render('authindex');
        }
        else {
            res.send("Incorrect Password");
            res.redirect("index")
        }
    }
    catch {
        res.send("Incorrect Details")

    }
})

app.get('/login', (req, res)=> {
    res.render('login');
})