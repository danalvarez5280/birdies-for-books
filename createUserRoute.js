const router = require('express').Router()
const Users = require('./model')

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone_number,
    pledge_score,
    pledge_amount,
    score_amount
  } = req.body;

  const users = await Users.findAll();
  let userIdCounter = Users.length +1;
  const user = {
    user_id: userIdCounter,
    name,
    email,
    phone_number,
    pledge_score,
    pledge_amount,
    score_amount
  }
  users.push(user)
  res.status(201).json(user)
});

module.exports = router;