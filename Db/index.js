const mongoose = require('mongoose');
const connectToDb = async () => {
    mongoose.connect("mongodb+srv://noumanraees901:uRETXGkMpg4EspHf@cluster0.wszfloo.mongodb.net/").then(() => {
        console.log("Database connection is established");
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = connectToDb;
