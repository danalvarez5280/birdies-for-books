const router = require('express').Router()
const Users = require('./model')

router.get('/', async (req, res) => {
  const id = parseInt(req.params.id)
  const users = await Users.findAll()
  const user = users.find(user => user.user_id == id)
  res.json(user)
});

module.exports = router;