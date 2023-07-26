const express = require('express');
const app = express();

const { render } = require('ejs');
const mongoose = require('mongoose');
const path = require("path");
const templatePath = path.join(__dirname, '../templates');
const collection = require("./mongodb");

app.set("view engine", "ejs");


app.listen(3000, ()=> {
    console.log("Server now running on port 3000")
});


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

    res.render("index")
})

app.post('/login', async (req, res) => {
    res.render('login')
})

app.get('/login', (req, res)=> {
    res.render('login.ejs');
})