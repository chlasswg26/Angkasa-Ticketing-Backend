const express = require('express')
const Route = express.Router()
const { check, param } = require('express-validator')

const {
  registerControllers,
  verificationControllers,
  loginControllers,
  refreshTokenControllers,
  logoutControllers
} = require('../controllers/auth.controllers')
const { verifyToken, verifyRefreshToken } = require('../middlewares/verify')
const validate = require('../middlewares/validation')

Route
  .post('/register', validate([
    check('name').escape().trim().notEmpty().withMessage('Name Can\'t be empty'),
    check('email').escape().trim().notEmpty().withMessage('E-mail Can\'t be empty').bail().isEmail().withMessage('E-mail bad format'),
    check('password').escape().trim().notEmpty().withMessage('Password Can\'t be empty').bail().isLength({
      min: 8
    }).withMessage('Password too short, min 8 character')
  ]), registerControllers)
  .get('/verification/:code', validate([
    param('code').escape().trim().notEmpty().withMessage('Verification Code can\'t be empty').bail().isString().withMessage('Verification code must be string/random text')
  ]), verificationControllers)
  .post('/login', validate([
    check('email').escape().trim().notEmpty().withMessage('E-mail Can\'t be empty').bail().isEmail().withMessage('E-mail bad format'),
    check('password').escape().trim().notEmpty().withMessage('Password Can\'t be empty').bail().isLength({
      min: 8
    }).withMessage('Password too short, min 8 character')
  ]), loginControllers)
  .get('/refresh-token', verifyRefreshToken, refreshTokenControllers)
  .get('/logout', verifyToken, logoutControllers)

module.exports = Route
