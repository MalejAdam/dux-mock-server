const jwt = require('jsonwebtoken')

const generateToken = data => {
  const token = jwt.sign(data, process.env.SECRET_JWT_KEY)

  return token
}

module.exports = generateToken
