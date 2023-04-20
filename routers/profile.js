const express = require('express')
const jsonServer = require('json-server')
const users = jsonServer.router('./server/databases/users.json').db.get('users')

const router = express.Router()

router.get('/', (req, res) => {
  const { user } = req

  const userFromDb = users.find({ id: user.id }).value()

  if (!userFromDb) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(userFromDb)
})

router.put('/', (req, res) => {
  const { user } = req

  const userFromDb = users.find({ id: user.id }).value()

  if (!userFromDb) {
    return res.status(404).json({ error: 'USER_NOT_FOUND' })
  }

  const { oldPassword, newPassword, confirmNewPassword } = req.body

  if (oldPassword || newPassword || confirmNewPassword) {
    const isValidNewPassword = newPassword === confirmNewPassword
    const isValidOldPassword = userFromDb.password === oldPassword

    if (!isValidNewPassword || !isValidOldPassword) {
      return res.status(400).json({ error: 'INVALID_DATA_INPUT' })
    }

    const updatedUser = { ...userFromDb, password: newPassword }

    users.find({ id: user.id }).assign(updatedUser).write()

    return res.json(updatedUser)
  }

  const updatedUser = {
    ...userFromDb,
    ...req.body
  }

  users.find({ id: user.id }).assign(updatedUser).write()

  return res.json(updatedUser)
})

module.exports = router
