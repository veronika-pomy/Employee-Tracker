// require inquirer, mysql, util, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const util = require('./node_modules/util/util');
const cTable = require('./node_modules/console.table');
// mysql queries required from separate file
const { CONNECTION_QUERY, 
        DEPARTMENT_QUERY,
        ROLE_QUERY, 
        EMPLOYEES_QUERY, 
        ADD_DEPARTMENT,
        ADD_ROLE,
        ADD_EMPLOYEE,
        UPDATE_ROLE } = require('./assets/js/queries');

// variables for display
const color = '\u001b[36m'; // cyan
const greeting = require('./assets/keyboard/art');

// vars that will become connection objs
let connection;
let execQuery;

// make query and display table in terminal
async function displayTable (input) {
    try {
        await execQuery(input, (err, res) => {
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
};

// add new dept
async function addDepartment (input) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Please enter the name of a new department:',
            },
        ]);
        
        await execQuery( input + `("${answer.newDepartment}");`, (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(color,`Added ${answer.newDepartment} to the database`);
                        prompt ( );
                    }
            });
        
    } catch (err) {
        console.error(err);
    };
};

// add new role
async function addRole (input) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Please enter the name of the new role:',
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Please enter the salary for the  new role:',
            },
            {
                type: 'list',
                name: 'newDepartmentChoice',
                message: 'Please choose which department the new role belongs to:',
                choices: ['Admin', 
                        'Legal', 
                        'Marketing',
                        'Sales',
                        'Maintenance',
                        'Accounting',
                        'Compliance']
            },
        ]);

        // assign dept name to deptartment_id
        switch (answer.newDepartmentChoice) {
            case "Admin":
                answer.newDepartmentChoice = 1;
                break;
            case "Legal":
                answer.newDepartmentChoice = 2;
                break;
            case "Marketing":
                answer.newDepartmentChoice = 3;
                break;
            case "Sales":
                answer.newDepartmentChoice = 4;
                break;
            case "Maintenance":
                answer.newDepartmentChoice = 7;
                break;
            case "Accounting":
                answer.newDepartmentChoice = 6;
                break;
            case "Compliance":
                answer.newDepartmentChoice = 5;
                break;
        };

        await execQuery( input +    `("${answer.newRole}", 
                                    "${answer.newSalary}", 
                                    ${answer.newDepartmentChoice}); `             
                , (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(color,`Added ${answer.newRole} to the database`);
                        prompt ( );
                    }
            });
        
    } catch (err) {
        console.error(err);
    };
};

// add new employee
async function addEmployee (input) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: 'Please enter first name of the new employee:',
            },
            {
                type: 'input',
                name: 'newEmployeeLastName',
                message: 'Please enter last name of the new employee:',
            },
            {
                type: 'list',
                name: 'newEmployeeRole',
                message: 'Please enter role of the new employee:',
                choices: ['Administrative Assistant', 
                        'Sales Associate', 
                        'Legal Intern',
                        'Sales Lead',
                        'Marketing Intern',
                        'Marketing Manager',
                        'HVAC Specialist',
                        'Janitor',
                        'Compliance Officer']
            },
            {
                type: 'list',
                name: 'newEmployeeManager',
                message: 'Please enter the new employee\'s manager name:',
                choices: ['None', 
                        'Carrie Reed', 
                        'Dan Smith',
                        ]
            },
        ]);

        // assign role name to role_id
        switch (answer.newEmployeeRole) {
            case "Administrative Assistant":
                answer.newEmployeeRole = 1;
                break;
            case "Sales Associate":
                answer.newEmployeeRole = 2;
                break;
            case "Legal Intern":
                answer.newEmployeeRole = 3;
                break;
            case "Sales Lead":
                answer.newEmployeeRole = 4;
                break;
            case "Marketing Intern":
                answer.newEmployeeRole = 5;
                break;
            case "Marketing Manager":
                answer.newEmployeeRole = 6;
                break;
            case "HVAC Specialist":
                answer.newEmployeeRole = 7;
                break;
            case "Janitor":
                answer.newEmployeeRole = 9;
                break;
            case "Compliance Officer":
                answer.newEmployeeRole = 8;
                break;
        };

        // assign manager name to manager_id
        switch (answer.newEmployeeManager) {
            case "None":
                answer.newEmployeeManager = null;
                break;
            case "Carrie Reed":
                answer.newEmployeeManager = 2;
                break;
            case "Dan Smith":
                answer.newEmployeeManager = 5;
                break;
        };

        await execQuery( input +    `("${answer.newEmployeeFirstName}", 
                                    "${answer.newEmployeeLastName}", 
                                    ${answer.newEmployeeRole}, 
                                    ${answer.newEmployeeManager});`
                , (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(color,`Added ${answer.newEmployeeFirstName} ${answer.newEmployeeLastName} to the database`);
                        prompt ( );
                    }
            });
    } catch (err) {
        console.error(err);
    };
};

// update an employee role
  // prompt to select and employee to update and their role
  // this information is updated in a database
  async function updateEmployeeRole ( ) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployeeName',
                message: 'Please enter which employee\'s role you\'d like to update:',
                choices: ['Adam Jones',
                        'Carrie Reed',
                        'Lois James',
                        'Kyle Wilson',
                        'Dan Smith',
                        'Tom Arnold',
                        'Trevor Blake',
                        'Kim Well']
            },
            {
                type: 'list',
                name: 'updateEmployeeRole',
                message: 'Please enter which role you\'d like to assign to the selected employee:',
                choices: ['Administrative Assistant', 
                        'Sales Associate', 
                        'Legal Intern',
                        'Sales Lead',
                        'Marketing Intern',
                        'Marketing Manager',
                        'HVAC Specialist',
                        'Janitor',
                        'Compliance Officer']
            },
        ]);

        // assign emplyee name to an id
        switch (answer.updateEmployeeName) {
            case "Adam Jones":
                answer.updateEmployeeName = 1;
                break;
            case "Carrie Reed":
                answer.updateEmployeeName = 2;
                break;
            case "Lois James":
                answer.updateEmployeeName = 3;
                break;
            case "Kyle Wilson":
                answer.updateEmployeeName = 4;
                break;
            case "Dan Smith":
                answer.updateEmployeeName = 5;
                break;
            case "Tom Arnold":
                answer.updateEmployeeName = 6;
                break;
            case "Trevor Blake":
                answer.updateEmployeeName = 7;
                break;
            case "Kim Well":
                answer.updateEmployeeName = 8;
                break;
        };

        // assign role name to role_id
        switch (answer.updateEmployeeRole) {
            case "Administrative Assistant":
                answer.updateEmployeeRole = 1;
                break;
            case "Sales Associate":
                answer.updateEmployeeRole = 2;
                break;
            case "Legal Intern":
                answer.updateEmployeeRole = 3;
                break;
            case "Sales Lead":
                answer.updateEmployeeRole = 4;
                break;
            case "Marketing Intern":
                answer.updateEmployeeRole = 5;
                break;
            case "Marketing Manager":
                answer.updateEmployeeRole = 6;
                break;
            case "HVAC Specialist":
                answer.updateEmployeeRole = 7;
                break;
            case "Janitor":
                answer.updateEmployeeRole = 9;
                break;
            case "Compliance Officer":
                answer.updateEmployeeRole = 8;
                break;
        };

        await execQuery(`UPDATE employee_table
                        SET role_id = ${answer.updateEmployeeRole}
                        WHERE id = ${answer.updateEmployeeName}
        `
                , (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(color,`Updated employee role.`);
                        prompt ( );
                    }
            });
    } catch (err) {
        console.error(err);
    };
};

// main prompt
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
                displayTable(DEPARTMENT_QUERY);
                break;
            case 'View all roles':
                displayTable (ROLE_QUERY);
            break;
            case 'View all employees':
                displayTable (EMPLOYEES_QUERY);
            break;
            case 'Add a department':
                addDepartment (ADD_DEPARTMENT);
            break;
            case 'Add a role':
                addRole (ADD_ROLE);
            break;
            case 'Add an employee':
                addEmployee (ADD_EMPLOYEE);
            break;
            case 'Update an employee role':
                updateEmployeeRole ( );
            break;
            case 'Quit':
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