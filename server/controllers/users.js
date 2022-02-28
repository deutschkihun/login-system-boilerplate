const asyncWrapper = require("../middleware/async");
const {User} = require('../models/user')
const { BadRequestError, NotFoundError } = require('../error')
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs");
const saltRound = 10;
const nodemailer = require('nodemailer')
require('dotenv').config();

const registerUser = asyncWrapper(async (req,res) => {
    const {firstName,lastName,age,country,password,email,phone} = await req.body
    const newBody = {
        firstName:firstName,
        lastName:lastName,
        age:age,
        countryCode:country.code,
        password:password,
        email:email,
        phone:phone
    }

    const checkEmail = await User.findOne({email: newBody.email})
    if(checkEmail) return res.json({registration:"failed",message:"This email is already used in database."})

    const user = await new User(newBody)
    if(!user) throw new BadRequestError('Please provide email and password')
    
    user.save((err,userInfo) => {
            if(err) return res.json({err,registration:"failed", message:"failed to save in database"})
            return res.status(200).json({registration:"success", userInfo})
    })
})


const loginUser = asyncWrapper(async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user)  return res.json({login:"failed", message:"Incorrect email"})
    
    user.comparePassword(req.body.password, async (err,isMatch) => {
        if(!isMatch) {
            return res.json({login:"failed", message:"Incorrect password"})
        } else {
            var token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET)
            user.token = token

            const tokenUser = await User.findByIdAndUpdate(user._id,user,{
                new:true,
                runValidators:true
            });

            res.cookie("x_auth", user.token).status(200);
            return res.status(200).json({tokenUser, isAuth:true,login:"success"})
        }      
    })
})

const authUser = asyncWrapper( async (req,res) => {
    res.status(200).json({isAuth:true})
})

const logoutUser = asyncWrapper( async (req,res) => {
    await res.clearCookie("x_auth");
    return res.status(200).json({logout:true})
})

const forgotEmailUser = asyncWrapper( async (req,res) => {
    const {firstName,lastName,age,phone} = await req.body
    const findEmail = await User.findOne({firstName:firstName,lastName:lastName,age:age,phone:phone})
    if(!findEmail) return res.json({find:false,message:"There is not matched information."})
    return res.status(200).json({find:true,email: `Your email is ${findEmail.email}`}) 
})

const forgotPasswordUser = asyncWrapper (async (req,res) => {
    const crypto = require('crypto');
    const randomEightDigits = crypto.randomInt(100000,999999)
    const {firstName,lastName,email} = await req.body

    let transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.netcorecloud.net",
        port: 587,
        auth: {
          user: process.env.ID,
          pass: process.env.PW
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      await transporter.sendMail({
        from: "info@deutschkihun.com",
        to: email,
        subject: "Your verification code", // Subject line
        text: `Your verification code is ${randomEightDigits}`,
      });

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    const findPassword = await User.findOne({firstName:firstName,lastName:lastName,email:email})
    if(!findPassword) return res.json({find:false,message:"There is not matched information."})

    return res.status(200).json({find:true,code:randomEightDigits,email:email}) 
})

const resetpasswordUser = asyncWrapper (async (req,res,next) => {
    let {email,password} = await req.body 

    bcryptjs.genSalt(saltRound, function(err,salt) {
        if(err) return next(err)

        bcryptjs.hash(password,salt, async (err,hash) => {
            if(err) return next(err)
            password = hash
            const resetUser = await User.findOneAndUpdate({email:email},{password:password},{
                new:true,
                runValidators:true
            })
            if(!resetUser) return res.json({reset:false,message:"There is not matched information."})
            return res.status(200).json({reset:true,resetUser}) 
        })
    })
})

const settingUser = asyncWrapper(async (req,res) => {
    const findUser = await User.findOne({_id:req.userId})
    if(!findUser)  return res.json({reset:false,message:"There is not matched User in  database."}) 
    return res.status(200).json({found:true,user:findUser})
})

const changeUser = asyncWrapper(async(req,res,next) => {
    let {firstName,lastName,age,password,email,phone} = await req.body

    bcryptjs.genSalt(saltRound, function(err,salt) {
        if(err) return next(err)

        bcryptjs.hash(password,salt, async (err,hash) => {
            if(err) return next(err)
            password = hash
            const changedUser = await User.findOneAndUpdate({email:email},{
                firstName:firstName,
                lastName:lastName,
                age:age,
                password:password,
                email:email,
                phone:phone
            },{
                new:true,
                runValidators:true
            })
            if(!changedUser) return res.json({reset:false,message:"Failed to update."})
            return res.status(200).json({change:true}) 
        })
    })
})

module.exports = {
    registerUser,
    loginUser,
    authUser,
    logoutUser,
    forgotEmailUser,
    forgotPasswordUser,
    resetpasswordUser,
    settingUser,
    changeUser,
}