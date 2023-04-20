const jsonServer = require('json-server')
const express = require('express')
const projects = jsonServer.router('./databases/projects.json').db.get('projects')
const router = express.Router()

router.post('/', (req, res) => {
  const { name } = req.body

  const existingProject = projects.find({ name }).value()

  if (existingProject) {
    return res.status(400).send({ error: 'PROJECT_ALREADY_EXIST' })
  }

  projects.push({ name }).write()

  return res.json({ message: 'Project added successfully' })
})

module.exports = router
