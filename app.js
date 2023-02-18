// require mysql, inquirer, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const cTable = require('./node_modules/console.table');
const query = require('./queries/queries'); // sql queries
// variables for display
const greenC = '\x1b[32m';
const art = require('./assets/keyboard/art');


// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'mysqlpass',
      database: 'employees_db'
    },
    // console.log(greenC, `Connected to the employees_db database.`);
  );

async function prompt ( ) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all departments', 
                        'View all roles', 
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        'Quit']
            },
        ]);

        console.log(answer.choice);
        // switch statement for different options for sql manipulation 

        } catch (err) {
            console.log(err);
    }
};

function init ( ) {
    console.log(greenC , art);
    prompt();
};


init();