const jsonServer = require('json-server')
const express = require('express')
const projects = jsonServer.router('./databases/projects.json').db.get('projects')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
  const { name } = req.body
  const id = uuidv4()

  const existingProject = projects.find({ name }).value()

  if (existingProject) {
    return res.status(400).send({ error: 'PROJECT_ALREADY_EXIST' })
  }

  projects.push({ id, name }).write()

  return res.json({ message: 'Project added successfully' })
})

router.get('/', (req, res) => {
  return res.json(projects)
})

module.exports = router
