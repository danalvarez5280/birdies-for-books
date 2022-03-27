const router = require('express').Router()
const Users = require('./model')

router.get('/', async (req, res) => {
  console.log('req', req)
  const users = await Users.findAll()
  res.json(users)
});

// const createUser = (request, response) => {
//   const {
//     name,
//     email,
//     phone_number,
//     pledge_score,
//     pledge_amount,
//     score_amount
//   } = request.body;

//   pool.query('INSERT INTO users (name, email, phone_number, pledge_score, pledge_amount, score_amount) VALUES ($1, $2, $3, $4, $5, $6)', [name, email, phone_number, pledge_score, pledge_amount, score_amount], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`);
//   })
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const {
//     name,
//     email,
//     phone_number,
//     pledge_score,
//     pledge_amount,
//     score_amount
//   } = request.body;

//   pool.query(
//     'UPDATE users SET name = $1, email = $2, phone_number = $3, pledge_score = $4, pledge_amount = $5, score_amount = $6 WHERE id = $7',
//     [name, email, phone_number, pledge_score, pledge_amount, score_amount, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   )
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   })
// };

module.exports = router; 