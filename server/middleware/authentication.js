const {User} = require('../models/user')
const { UnauthenticatedError } = require('../error')
const jwt = require('jsonwebtoken')
require('dotenv').config();

let authentication = (req,res,next) => {

    let token = req.cookies.x_auth;
    if(!token) {
        res.status(200).json({isAuth:false})
    } else {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const authenticatedUser = User.find({_id:decoded,token:token})
            if(!authenticatedUser) {
                return res.json({isAuth:false, message:"there is no authenticated user"})
            } else {
                req.userId = decoded
                next();
            }
            //next();
        } catch(error) {
            throw new UnauthenticatedError('Authentication invalid')
        }
    }
}



module.exports = authentication;