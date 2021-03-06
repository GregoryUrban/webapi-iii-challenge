// code away!
require('dotenv').config(); // add the library "yarn add dotenv", then add this as first line of code

const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
})

server.listen(PORT, () => {
  console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});
