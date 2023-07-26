const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//encrypts submitted password
const register = (res, req, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error:err
            })
        }
    })

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPass
    })
    user.save()
    .then(user => {
        res.json({
            message: 'This User has been Successfully Added!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

module.exports = {
    register
}