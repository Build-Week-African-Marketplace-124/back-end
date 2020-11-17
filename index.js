// require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 3300;

server.listen(PORT, ()=>{
  console.log(`Server is on ${PORT}`)}  );


