const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 	8889,
      user : 'root',
      password : 'root',
      database : 'e-learning'
    },
    debug: true
  });

  module.exports = knex