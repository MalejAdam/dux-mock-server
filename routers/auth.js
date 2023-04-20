const jsonServer = require('json-server')
const express = require('express')
const generateToken = require('../utils/generateToken')
const users = jsonServer.router('./databases/users.json').db.get('users')
const router = express.Router()

router.post('/signup', (req, res) => {
  const { email, password, confirmPassword, ...userData } = req.body

  if (email && password) {
    const existingUser = users.find({ email }).value()

    if (existingUser) {
      return res.status(400).send({ error: 'USER_ALREADY_EXIST' })
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'INVALID_DATA_INPUT' })
    }

    users.push({ ...userData, email, password }).write()
    const token = generateToken({ ...userData, email })

    return res.send({ token, user: userData })
  }

  return res.status(400).send({ error: 'Invalid request' })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  const user = users.find({ email, password }).value()

  if (!user) {
    return res.status(401).send({ error: 'INVALID_EMAIL_OR_PASSWORD' })
  }

  // eslint-disable-next-line no-unused-vars
  const { password: _userPassword, ...userData } = user

  const token = generateToken(userData)

  return res.send({ token, user: userData })
})

module.exports = router
