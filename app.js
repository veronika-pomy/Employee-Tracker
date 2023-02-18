// require mysql, inquirer, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const cTable = require('./node_modules/console.table');
const query = require('./queries/queries'); // sql queries


// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'mysqlpass',
      database: 'employees_db'
    },
    // console.log(`Connected to the employees_db database.`)
  );

  