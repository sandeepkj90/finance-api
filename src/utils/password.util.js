const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const hash = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

const compare = async (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  compare
}
