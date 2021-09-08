module.exports = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'id malformed'
    })
  } else {
    response.status(500).send({
      error: 'server error'
    })
  }
}
