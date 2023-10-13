const express = require('express')
const {
  createUser,
  loginUser,
  userProfile,
} = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware/auth')

const router = express.Router()

// Routes created

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/me', isAuthenticated, userProfile)

module.exports = router
