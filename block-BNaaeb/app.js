const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const Router = require('./routes/index');
const userRouter = require('./routes/user');
const app = express();


app.use(logger('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use('/', Router);
app.use('/users', userRouter);

mongoose.connect('mongodb://127.0.0.1:27017/podcast',(err) => {
    console.log(err?err:'Database Connected Successfully');
})

app.listen('4000', () => {
    console.log('Server is listening on port 4000');
})