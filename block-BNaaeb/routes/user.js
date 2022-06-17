const express = require('express');
const userRouter = express.Router();
const user = require('../models/user');

userRouter.get('/register', (req,res) => {
    res.render('register')
})

userRouter.post('/register', (req,res) => {
    user.create(req.body,(err,user) => {
        console.log(err,user);
        res.redirect('/users/login');
    })
})

userRouter.get('/login', (req,res) => {
    res.render('login')
})

userRouter.post('/login', (req,res) => {
    let {email,password} = req.body;
    if(!email && !password){
        return res.redirect('/users/login');
    }
    user.findOne({email},(err,user) => {
        if(err) next(err);
        if(!user){
         return res.redirect('/users/login');
        }
        user.validatePassword(password,(err,result) => {
            if(err) next(err);
            console.log(err,result);
        })

    })
})

module.exports = userRouter;