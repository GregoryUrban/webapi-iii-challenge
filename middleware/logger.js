function logger(req, res, next) {
    console.log(`
    URL: http://localhost:5000${req.originalUrl}
    ${new Date().toISOString()}: ${req.method} to ${req.url}`)
    next()
  };
module.exports = logger