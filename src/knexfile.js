const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    port :  8889,
    user : 'root',
    password : 'root',
    database : 'e-learning',
insecureAuth : true
  },
  debug: true
});

module.exports = knex
