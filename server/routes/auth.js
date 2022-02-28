const express = require('express');
const router = express.Router();
const { authUser, logoutUser, settingUser } = require('../controllers/users')


router.route('/').get(authUser)
router.route('/logout').get(logoutUser)
router.route('/setting').get(settingUser);

module.exports = router