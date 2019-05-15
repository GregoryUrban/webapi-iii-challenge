const express = require('express'); // importing a CommonJS module

const server = express();

server.use(express.json()); 


server.get('/', (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
  next();
});

//custom middleware
// const logger = require('./middleware/logger.js'); // importing a CommonJS module

function logger(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.method} to ${req.url}`)
  next()
};

module.exports = server;
