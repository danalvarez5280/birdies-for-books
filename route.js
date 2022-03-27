const router = require('express').Router()
const Users = require('./model')

router.get('/', async (req, res) => {
  const users = await Users.findAll()
  res.json(users)
})

module.exports = router;