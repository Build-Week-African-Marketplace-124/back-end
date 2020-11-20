const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// const auth = require('../middleware/authenticate-middleware.js');
const authRouter = require('../auth/auth-router');
const itemsRouter = require('../routes/items-router');
const usersRouter = require('../routes/users-router');
// const server = require('../index.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/items', itemsRouter);
server.use('/api/users',  usersRouter);

server.get('/', (req, res) => {
  // res.status(200).json({
  //   message: `${process.env.FUN}`
  // })
  res.status(200).json({ message: "it's alive!" });
});
module.exports = server;
