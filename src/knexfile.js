const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 	3306,
    user : 'learn',
    password : 'Learn123',
    database : 'elearning',
insecureAuth : true
  },
  debug: true
});

module.exports = knex