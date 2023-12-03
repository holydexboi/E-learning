const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 	3306,
    user : 'dhulqev',
    password : 'learn',
    database : 'elearning',
insecureAuth : true
  },
  debug: true
});

module.exports = knex