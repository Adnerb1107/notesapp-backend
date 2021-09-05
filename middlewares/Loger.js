const logger = (req, res, next) => {
  console.log('aqui primero')
  next()
}

module.exports = logger
