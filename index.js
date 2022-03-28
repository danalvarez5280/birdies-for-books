require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Users = require('./model');

const server = express();
const port = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>This is the Birdies for Books Api</h1>')
});

server.get('/users', async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
});


server.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const users = await Users.findAll();
  const individualUser = users.filter(user => user.user_id == id);
  res.json(individualUser);
});

server.post('/users', async (req, res) => {
  const newUser = req.body;
  await Users.addUser(newUser, res);
});

server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await Users.deleteUser(id, res);
})


server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});