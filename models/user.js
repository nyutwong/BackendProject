const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    SSN: {
        type: String,
        unique: [true, "This SSN is already used"],
        require: [true, "Please enter your SSN"]
    },
    name: {
        type: String,
        maxlength: [20,"A name can not be more than 10 characters"],
        require: [true, "Please enter your name"]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ],
        unique: [true, "This email is already used"],
        require: [true, "Please enter your email"]

    },
    password: {
        type: String,
        require: [true, "Please enter your password"]
    },
    telephone_number: {
        type: String,
        require: [true, "Please enter your password"]
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["ADMIN","USER"],
        default: "USER"
    },
    address: {
        type: String
    }


});