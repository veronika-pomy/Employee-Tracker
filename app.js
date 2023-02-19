// require mysql, inquirer, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const util = require('./node_modules/util/util');
const cTable = require('./node_modules/console.table');
const { CONNECTION_QUERY, NEW_QUERY } = require('./queries/queries');

// variables for display
const color = '\u001b[36m'; // cyan
const greeting = require('./assets/keyboard/art');

// var that will become connection obj
let connection;

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

        // if connection has not been est yet, create connection obj and execQuery obj
        if (!connection) {
            // create obj to connect to mysql 
            connection = mysql.createConnection(CONNECTION_QUERY,console.log(color, `Connected to the employees_db database.`)); 
            const execQuery = util.promisify(connection.query.bind(connection)); // make connection an obj inside execQuery
        }

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
                connection.end();
                return;
        };

        } catch (err) {
            console.log(err);
    };
};

// initialize app
function init ( ) {
    console.log(color , greeting);
    prompt();
};


init();