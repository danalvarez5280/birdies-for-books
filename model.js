const db = require('./data/db-config');

const findAll = () => {
  return db('users');
};

const addUser = (newUser, res) => {
  if (!newUser) {
    return res.status(422).send({ error: `Expoected a new user, please add a user` });
  }

  return db('users').insert(newUser, '*')
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const deleteUser = (user_id, res) => {
  return db('users').where({ user_id }).del()
    .then(user => {
      if (user) {
        res.sendStatus(204);
      } else {
        res.status(422).json({ error: 'Not Found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    });
};

module.exports = {
  findAll,
  addUser,
  deleteUser
};