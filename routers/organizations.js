const jsonServer = require('json-server')
const express = require('express')
const organizations = jsonServer.router('./databases/organizations.json').db.get('organizations')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
  const { name } = req.body
  const id = uuidv4()

  const existingOrganization = organizations.find({ name }).value()

  if (existingOrganization) {
    return res.status(400).send({ error: 'ORGANIZATION_ALREADY_EXIST' })
  }

  organizations.push({ id, name }).write()

  return res.json({ message: 'Organization added successfully' })
})

module.exports = router
