const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    res.status(401).send({ error: 'Unauthorized' })
  } else {
    try {
      const bearerToken = token.split(' ')[1]
      const decodedToken = jwt.verify(bearerToken, process.env.SECRET_JWT_KEY)
      req.user = decodedToken
      next()
    } catch (err) {
      res.status(403).send({ error: 'Forbidden' })
    }
  }
}

module.exports = requireAuth
