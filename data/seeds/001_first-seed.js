const users = [
  {
    name: 'Dan Alvarez',
    email: 'danalvarez5280@gmail.com',
    phone_number: '3035706753',
    pledge_score: 'par',
    pledge_amount: '5',
    score_amount: '0'
  }
];

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert(users)
    })
};