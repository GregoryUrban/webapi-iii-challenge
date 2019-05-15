const express = require('express'); // importing a CommonJS module
const server = express();
server.use(express.json()); 

const userRouter = require('./users/userRouter'); // importing a CommonJS module
server.use('/api/users', userRouter);
// const postRouter = require('./users/userRouter'); // importing a CommonJS module
// server.use('/api/posts', postRouter);

//custom middleware - moved into new file, /middleware/userRouter

// safety first!
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Bad Panda",
    err
  });
})

module.exports = server;
