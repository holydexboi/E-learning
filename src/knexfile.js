const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '65.20.102.32',
    port : 	3306,
    user : 'dhulqev',
    password : 'learn',
    database : 'elearning',
insecureAuth : true
  },
  debug: true
});

module.exports = knex
