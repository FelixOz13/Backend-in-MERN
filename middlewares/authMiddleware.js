const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token
  if (req?.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded?.id)
        if (user) {
          req.user = user

          next()
        } else {
          throw new Error('User not found')
        }
      }
    } catch (error) {
      console.error('Error in authMiddleware:', error)
      throw new Error('Authorization failed: ' + error.message)
    }
  } else {
    throw new Error('No valid token attached to the header')
  }
})

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  const { email } = req.user
  const adminUser = await User.findOne({ email })
  if (adminUser.role !== 'admin') {
    throw new Error('You are not an admin')
  } else {
    next()
  }
})
module.exports = { authMiddleware, isAdmin }
