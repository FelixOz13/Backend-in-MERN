const notFound = (req, res, next) => {
  console.log('Not Found Middleware:', req.originalUrl)
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  console.log('Error Handler Middleware:', err)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: err?.stack,
  })
}

module.exports = { errorHandler, notFound }
