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

// server.post('/users', async (req, res) => {
//   const newUser = req.body
//   console.log('newUser', newUser);
//   console.log('req body', req.body);

//   const users = await Users.findAll();
//   users.push(newUser);
//   res.json(newUser);
// });


// server.post('/users', (request, response) => {
//   const user = request.body;

//   for (let requiredParameter of ['name', 'email', 'phone_number', 'pledge_score', 'pledge_amount', 'score_amount']) {
//     if (!user[requiredParameter]) {
//       return response
//         .status(422)
//         .send({
//           error: `Expected format: {
//         name: <String>,
//         email: <String>,
//         phone_number: <String>,
//         pledge_score: <String>,
//         pledge_amount: <String>,
//         score_amount: <String>,
//       }. You're missing a "${requiredParameter}" property.`
//         });
//     }
//   }

//   database('users').insert(user, '*')
//     .then(user => {
//       response.status(201).json(user)
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});