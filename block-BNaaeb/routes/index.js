const express = require('express');
const Router = express.Router();

Router.get('/', (req,res) => {
    res.cookie('test','Hello World');
    res.send("Hello World");
})

module.exports = Router;