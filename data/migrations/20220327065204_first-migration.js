exports.up = (knex) => {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('user_id');
      table.string('name', 128).notNullable();
      table.string('email', 128).notNullable();
      table.string('password', 128).notNullable();
      table.string('phone_number', 128).notNullable();
      table.string('pledge_score', 128).notNullable();
      table.string('pledge_amount', 128).notNullable();
      table.string('score_amount', 128).notNullable();
      table.string('outstanding_balance', 128).notNullable();
      table.string('amount_paid_to_date', 128).notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};