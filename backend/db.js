const mongoose = require('mongoose');
const schedule = require('node-schedule');
require('dotenv').config();

const mongoUrl ="mongodb://127.0.0.1:27017/newtaxdb";
// console.log(mongoUrl)

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo successfully......");
    })
}

module.exports = connectToMongo;