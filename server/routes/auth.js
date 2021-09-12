var express = require('express')
var router = express.Router()
var {ensureLoggedIn, ensureLoggedOut} = require('../util/ensureAuth')

var { login, logout, signup, is, reset_password, request_password_reset, auth_profile } = require('../controllers/auth')

router.post('/login', ensureLoggedOut(), login)
router.post('/signup', ensureLoggedOut(), signup)
router.get('/logout', ensureLoggedIn(), logout)
router.get('/is', is)
router.get('/auth_profile', ensureLoggedIn(), auth_profile)
router.get('/request_password_reset', ensureLoggedOut(), request_password_reset)
router.put('/reset_password', reset_password)

module.exports = router
