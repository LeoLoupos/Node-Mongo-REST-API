const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = function(req, res, next) {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            }); //409 or 422 got the req but there is a conflict / we cant process it

        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password //salting adds random strings before the hash and curries them around
            });
        
            user.save()
            .then(result => {
                console.log(result);                
                res.status(201).json({
                    message: 'User created'
                });
            })
            .catch( error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
        
        }//end of user.length >= 1
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });

}

exports.user_login = function(req, res, next){ 

    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            console.log(user);
            const token = jwt.sign({ //jwt.sign takes 4 args 
                email: user.email,
                userId:  user._id
            }, 
            process.env.JWT_KEY,
            {
                expiresIn: '1h'
            });

            return res.status(200).json({ 
                    message: 'Auth successful',
                    token: token //JWT token is encoded but not encrypted
            });
        }
    });
        // User.find({ email: req.body.email })
        // .exec()
        // .then( user => {
        //     if (user.length < 1) {
        //         return res.status(401).json({ //401: Unauthorized
        //             message: 'Auth failed'
        //         })
        //     }
        //     //Compare hashed Password
        //     bcrypt.compare(req.body.password, user[0].password , (err, result) => {
        //         if (err) {
        //             return res.status(401).json({ //401: Unauthorized
        //                 message: 'Auth failed'
        //             });
        //         }
    
                // if (result) {
                //     //If user valid => build jwt token
                //     const token = jwt.sign({ //jwt.sign takes 4 args 
                //         email: user[0].email,
                //         userId:  user[0]._id
                //     }, 
                //     process.env.JWT_KEY,
                //     {
                //         expiresIn: '1h'
                //     });
    
        //             return res.status(200).json({ 
        //                 message: 'Auth successful',
        //                 token: token //JWT token is encoded but not encrypted
        //             });
        //         }
    
        //         //PassWord Incorrect
        //         res.status(401).json({ //401: Unauthorized
        //             message: 'Auth failed'
        //         });
    
        //     });
            
    
        // })
        // .catch( error => {
        //     console.log(error);
        //     res.status(500).json({
        //         error: error
        //     });
        // });
    
}

exports.user_delete = function(req, res, next){
    const id = req.params.id;
    User.remove({ _id: id }).exec()
    .then(result =>{
        res.status(200).json({
            message: 'User deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/user',
                body: { email: 'String', password: 'String' }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}