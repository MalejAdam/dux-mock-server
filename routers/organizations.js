const jsonServer = require('json-server')
const express = require('express')
const organizations = jsonServer.router('./server/databases/organizations.json').db.get('organizations')
const router = express.Router()

router.post('/', (req, res) => {
  const { name } = req.body

  const existingOrganization = organizations.find({ name }).value()

  if (existingOrganization) {
    return res.status(400).send({ error: 'ORGANIZATION_ALREADY_EXIST' })
  }

  organizations.push({ name }).write()

  return res.json({ message: 'Organization added successfully' })
})

module.exports = router
