const express = require('express');
const router = express.Router();
const { registerUser,
        loginUser,
        forgotEmailUser,
        forgotPasswordUser,
        resetpasswordUser,
        changeUser,
        } = require('../controllers/users')


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/forgotemail').post(forgotEmailUser)
router.route('/forgotpassword').post(forgotPasswordUser)
router.route('/resetpassword').post(resetpasswordUser)
router.route('/change').patch(changeUser)
module.exports = router