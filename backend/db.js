const mongoose = require("mongoose");
const MONGO_URI = require("./config")

mongoose.connect("mongodb+srv://nandanpathak30:dbnew%40123@cluster0.dx4on7v.mongodb.net/paytm");
/* mongoose.connect("MONGO_URI"); */


// Creating simple schema

/* const userSchema = new mongoose.Schema({
    userName : String,
    firstName: String,
    lastName: String,
    password: String
}); */

// creating elegant schema

const userSchema = new mongoose.Schema({
    username : { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    }, 
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName:{
        type : String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type : String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:50
    }
})

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    balance: {
        type: Number,
        require: true
    }
})

// modelling the schema
const User = mongoose.model("user", userSchema)
const Account = mongoose.model("accounts", accountsSchema )

module.exports = {
    User, Account
}