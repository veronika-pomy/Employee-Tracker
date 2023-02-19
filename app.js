// require mysql, inquirer, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const util = require('./node_modules/util/util');
const cTable = require('./node_modules/console.table');
const { CONNECTION_QUERY, DEPARTMENT_QUERY, ROLE_QUERY, EMPLOYEES_QUERY } = require('./queries/queries');

// variables for display
const color = '\u001b[36m'; // cyan
const greeting = require('./assets/keyboard/art');

// vars that will become connection objs
let connection;
let execQuery;

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

        const usersChoice = answer.choice;

        // if connection has not been established yet, create connection obj and execQuery obj
        if (!connection) {
            connection = mysql.createConnection(CONNECTION_QUERY); 
            execQuery = util.promisify(connection.query.bind(connection)); // make connection an obj inside execQuery
        }

        // sql queries based on choice 
        switch(usersChoice) {
            case 'View all departments':
                try {
                    await execQuery(DEPARTMENT_QUERY, (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.table(color,"     ", res, "     ");
                            prompt ( );
                        };
                });
                } catch (err) {
                    console.error(err);
                };
                break;
            case 'View all roles':
                try {
                    await execQuery(ROLE_QUERY, (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.table(color,"     ", res, "     ");
                            prompt ( );
                        };
                });
                } catch (err) {
                    console.error(err);
                };
                prompt ( );
            break;
            case 'View all employees':
                try {
                    await execQuery(EMPLOYEES_QUERY, (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.table(color,"     ", res, "     ");
                            prompt ( );
                        };
                });
                } catch (err) {
                    console.error(err);
                };
            break;
            case 'Add a department':
                console.log(color, `User decided to: ${usersChoice}`);
                prompt ( );
            break;
            case 'Add a role':
                console.log(color, `User decided to: ${usersChoice}`);
                prompt ( );
            break;
            case 'Add an employee':
                console.log(color, `User decided to: ${usersChoice}`);
                prompt ( );
            break;
            case 'Update an employee role':
                console.log(color, `User decided to: ${usersChoice}`);
                prompt ( );
            break;
            case 'Quit':
                console.log(color, `User decided to: ${usersChoice}`);
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