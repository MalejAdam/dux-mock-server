const jsonServer = require('json-server')
const express = require('express')
const users = jsonServer.router('./server/databases/users.json').db.get('users')
const router = express.Router()

router.get('/', (req, res) => {
  return res.json(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = users.find({ id }).value()

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const userData = users.find({ id })
  const user = userData.value()

  if (!user) {
    return res.status(404).json({ error: 'USER_NOT_FOUND' })
  }

  userData.assign(req.body).write()

  return res.json({ message: 'User updated successfully', id })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const user = users.find({ id }).value()

  if (!user) {
    return res.status(404).json({ error: 'USER_NOT_FOUND' })
  }

  users.remove({ id }).write()

  return res.send(`User with ID ${id} deleted successfully`)
})

module.exports = router
