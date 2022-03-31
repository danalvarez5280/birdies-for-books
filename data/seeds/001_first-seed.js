const users = [
  {
    name: 'Dan Alvarez',
    email: 'danalvarez5280@gmail.com',
    password: 'password',
    phone_number: '3035706753',
    pledge_score: 'par',
    pledge_amount: '5',
    score_amount: '0',
    outstanding_balance: '0',
    amount_paid_to_date: '0'
  }
];

exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert(users);
};

