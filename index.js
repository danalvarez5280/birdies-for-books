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
  console.log('users')
  const users = await Users.findAll();
  res.json(users);
});


server.get('/users/by-id/:id', async (req, res) => {
  const { id } = req.params;
  const users = await Users.findAll();
  const individualUser = users.filter(user => user.user_id == id);
  res.json(individualUser);
});

server.get('/users/login', async (req, res) => {
  const userInfo = req.body;
  const { email, password } = userInfo;
  const users = await Users.findAll();
  const userToLogIn = users.filter(user => (user.email === email && user.password === password));
  res.json(userToLogIn);
})

server.post('/users', async (req, res) => {
  const newUser = req.body;
  await Users.addUser(newUser, res);
});

server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await Users.deleteUser(id, res);
});

server.patch('/users/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const newUserIno = req.body;
  
  await Users.updateUser(id, newUserIno, res)
});

server.patch('/users/update-scores/:id/:score_amount_to_add', async (req, res) => {
  const { id, score_amount_to_add } = req.params;
  const users = await Users.findAll();
  const individualUser = users.filter(user => user.user_id == id)[0];
  const {
    score_amount,
    pledge_amount,
    outstanding_balance,
  } = individualUser;
  const newScoreAmount = (parseInt(score_amount) + parseInt(score_amount_to_add)).toString();
  const newOutStandingBalance = ((parseInt(score_amount_to_add) * parseInt(pledge_amount)) + parseInt(outstanding_balance));
  const newUserInfo = {
    ...individualUser,
    score_amount: newScoreAmount,
    outstanding_balance: newOutStandingBalance
  };
  await Users.updateUser(id, newUserInfo, res);
});

server.patch('/users/update-amount-paid/:id/:amount_being_paid', async (req,res) => {
  const { id, amount_being_paid } = req.params;
  const users = await Users.findAll();
  const individualUser = users.filter(user => user.user_id == id)[0];
  const {
    outstanding_balance,
    amount_paid_to_date
  } = individualUser;
  const newAmountPaidToDate = (parseInt(amount_being_paid) + parseInt(amount_paid_to_date)).toString();
  const newOutStandingBalance = (parseInt(outstanding_balance) - parseInt(amount_being_paid)).toString();
  const newUserInfo = {
     ...individualUser,
    outstanding_balance: newOutStandingBalance,
    amount_paid_to_date: newAmountPaidToDate
    }

  await Users.updateUser(id, newUserInfo, res)
});


server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});