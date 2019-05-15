const express = require('express'); // importing a CommonJS module
const server = express();
server.use(express.json()); 

const userRouter = require('./users/userRouter'); // importing a CommonJS module
server.use('/api/users', userRouter);


//custom middleware


module.exports = server;
