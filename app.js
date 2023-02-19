// require mysql, inquirer, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const cTable = require('./node_modules/console.table');
const query = require('./queries/queries'); // sql queries
// variables for display
const color = '\u001b[36m'; // cyan
const greeting = require('./assets/keyboard/art');

// connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'mysqlpass',
//       database: 'employees_db'
//     },
//     // console.log(color, `Connected to the employees_db database.`)
//   );

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

        // sql queries based on choice 
        
        switch(answer.choice) {
            case 'View all departments':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'View all roles':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'View all employees':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'Add a department':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'Add a role':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'Add an employee':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'Update an employee role':
                console.log(color, `User decided to: ${answer.choice}`);
                prompt ( );
            break;
            case 'Quit':
                console.log(color, `User decided to: ${answer.choice}`);
                return; // exit app if user decides to quit
        };

        } catch (err) {
            console.log(err);
    }
};

function init ( ) {
    console.log(color , greeting);
    prompt();
};


init();