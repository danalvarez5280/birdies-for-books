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
  const { id } = req.params;
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
});

server.patch('/users/:id/:score_amount_to_add', async (req, res) => {
  const { id, score_amount_to_add } = req.params;
  const users = await Users.findAll();
  const individualUser = users.filter(user => user.user_id == id)[0];
  const newScoreAmount = (parseInt(individualUser.score_amount) + parseInt(score_amount_to_add)).toString();
  const newUserInfo = {...individualUser, score_amount: newScoreAmount}
  await Users.updateUserScore(id, newUserInfo, res)
});


server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});