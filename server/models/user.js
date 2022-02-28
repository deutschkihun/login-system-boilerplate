const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const saltRound = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:[true,'must provide first name']
    },
    lastName:{
        type:String,
        required:[true,'must provide last name']
    },
    email: {
        type:String,
        trim: true,
        unique:1,
        required:[true,'must provide email']
    },
    password: {
        type:String,
        required:[true, 'must provide password']
    },
    age: {
        type:Number,
        required:[true, 'must provide age']
    },
    countryCode: {
        type:String,
        required:[true, 'must provide country']
    },
    token: {
        type:String
    },
    phone: {
        type:Number,
        required:[true, 'must provide phone number']
    }
},{
    versionKey: false 
})

userSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')) {
        bcryptjs.genSalt(saltRound, function(err, salt) {
            if(err) return next(err)

            bcryptjs.hash(user.password, salt, function (err,hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

userSchema.methods.comparePassword = function (plainPassword,cb) {
    bcryptjs.compare(plainPassword,this.password,function (err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        this.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User',userSchema)
module.exports = {User};