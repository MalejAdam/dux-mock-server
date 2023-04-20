const jsonServer = require('json-server')
const userRouter = require('./routers/userRouter')
const organizationsRouter = require('./routers/organizations')
const projectsRouter = require('./routers/projects')
const profileRouter = require('./routers/profile')
const authRouter = require('./routers/auth')
const requireAuth = require('./middlewares/requireAuth')

const server = jsonServer.create()

require('dotenv').config()

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

server.use('/api/users', requireAuth, userRouter)
server.use('/api/organizations', requireAuth, organizationsRouter)
server.use('/api/projects', requireAuth, projectsRouter)
server.use('/api/profile', requireAuth, profileRouter)
server.use('/auth', authRouter)

server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running')
})
