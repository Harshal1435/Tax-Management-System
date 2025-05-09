const mongoose = require('mongoose');
const schedule = require('node-schedule');
require('dotenv').config();

const mongoUrl ="mongodb+srv://harshal:CsTg5w0upPnW5Ttq@cluster0.69rkq.mongodb.net/newtaxdb";
// console.log(mongoUrl)

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo successfully......");
    })
}

module.exports = connectToMongo;
