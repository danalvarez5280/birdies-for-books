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

const updateUserScore = (user_id, user, res) => {
  return db('users').where({ user_id }).update(user, '*')
    .then((user) => {
      if (!user.length) {
        return res.status(404).json({ error: `The user with ID# ${id} was not found and could not be updated` });
      }
      return res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
};

module.exports = {
  findAll,
  addUser,
  deleteUser,
  updateUserScore
};