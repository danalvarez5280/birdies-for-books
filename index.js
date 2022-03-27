require('dotenv').config();

const express = require('express');
const cors = require('cors');

const getAllUsers = require('./getAllRoute');
const getUserById = require('./getUserByIdRoute');
const createUser = require('./createUserRoute');

const server = express();
const port = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>This is the Birdies for Books Api</h1>')
});
server.use('/users', getAllUsers);
server.use('/users/:id', getUserById);
server.use('/users', createUser); // not working
// server.put('/users/:id', updateUser );
// server.delete('/users/:id', deleteUser);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});