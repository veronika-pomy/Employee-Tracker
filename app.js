// require inquirer, mysql, util, cTable
const inquirer = require('./node_modules/inquirer');
const mysql = require('./node_modules/mysql2');
const util = require('./node_modules/util/util');
const cTable = require('./node_modules/console.table');
// mysql queries required from separate file
const { CONNECTION_QUERY, DEPARTMENT_QUERY, ROLE_QUERY, EMPLOYEES_QUERY, ADD_DEPARTMENT, ADD_ROLE, ADD_EMPLOYEE} = require('./assets/js/queries');

// variables for display
const { greeting, color } = require('./assets/js/greeting');

// vars that will become connection objs
let connection;
let execQuery;
// arrays that will be used to hold queries from databases that will be used in drop down prompts
let arrayDepartment = [];
let arrayRole = [];
let arrayEmployeeName = [];
let updateArrayName = [];
let updateArrayRole = [];

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
                        console.log(color,`Added ${answer.newDepartment} to the database.`);
                        prompt ( );
                    };
            });
        
    } catch (err) {
        console.error(err);
    };
};

// add new role
async function addRole (input) {
    try {
        execQuery(`SELECT department_name FROM department_table ORDER BY department_table.id;`
        , (err, res) => {
            if (err) {
                console.error(err);
            } else {
                for (let i = 0; i < res.length; i++){
                    arrayDepartment.push(res[i].department_name);
                };
            };
        });

        const answer = inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Please enter the name of the new role:',
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Please enter the salary for the new role:',
            },
            {
                type: 'list',
                name: 'newDepartmentChoice',
                message: 'Please choose which department the new role belongs to:',
                choices: arrayDepartment
            },
        ])
        .then((answer) => {
            // assign deptartment_id as deptId
            const deptId = arrayDepartment.indexOf(answer.newDepartmentChoice)+1;
            execQuery( input + `("${answer.newRole}", "${answer.newSalary}", "${deptId}"); `             
            , (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log(color,`Added ${answer.newRole} to the database.`);
                //reset array to reuse
                arrayDepartment = [];
                prompt ( );
            }
    });
        });
    } catch (err) {
        console.error(err);
    };
};

// add new employee
async function addEmployee (input) {
    try {
        execQuery(`SELECT title FROM role_table ORDER BY role_table.id;`
        , (err, res) => {
            if (err) {
                console.error(err);
            } else {
                
                for (let i = 0; i < res.length; i++){
                    arrayRole.push(res[i].title);
                };

            };
        });

        execQuery(`SELECT CONCAT(first_name, ' ', last_name) as employee FROM employee_table ORDER BY employee_table.id;`
                , (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        for (let i = 0; i < res.length; i++){
                            arrayEmployeeName.push(res[i].employee);
                        };
                };
                arrayEmployeeName.push('None'); // add option for no manager
            });

        const answer = inquirer.prompt([
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
                choices: arrayRole
            },
            {
                type: 'list',
                name: 'newEmployeeManager',
                message: 'Please enter the new employee\'s manager name:',
                choices: arrayEmployeeName
            }
        ])
        .then((answer) => {
            // assign role name to role_id
            const roleId = arrayRole.indexOf(answer.newEmployeeRole)+1;
            let managerId;
            if (answer.newEmployeeManager === "None") {
                managerId = null;
            } else {
                // assign employee_id name as managerId
                managerId = arrayEmployeeName.indexOf(answer.newEmployeeManager)+1;
            };

            execQuery( input + `("${answer.newEmployeeFirstName}", "${answer.newEmployeeLastName}", ${roleId}, ${managerId});`
                    , (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(color,`Added ${answer.newEmployeeFirstName} ${answer.newEmployeeLastName} to the database.`);
                            // reset arrays to reuse
                            arrayEmployeeName = [];
                            arrayRole = [];
                            prompt ( );
                        }
                    });
        });
    } catch (err) {
        console.error(err);
    };
};

// update employee role
async function updateEmployeeRole ( ) {
    execQuery(`SELECT CONCAT(first_name, ' ', last_name) as employee FROM employee_table ORDER BY employee_table.id;`
    , (err, res) => {
        if (err) {
        console.error(err);
    } else {
        for (let i = 0; i < res.length; i++){
            updateArrayName.push(res[i].employee);
        };

        const answer = inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployeeName',
                message: 'Please enter which employee\'s role you\'d like to update:',
                choices: updateArrayName
            },
        ])
        .then(answer => {

                const chosenName = answer.updateEmployeeName;

                execQuery(`SELECT title FROM role_table ORDER BY role_table.id;`
                    , (err, res) => {
                        if (err) {
                        console.error(err);
                    } else {
                        for (let i = 0; i < res.length; i++){
                            updateArrayRole.push(res[i].title);
                        };

                        const answer = inquirer.prompt([
                            {
                                type: 'list',
                                name: 'updateEmployeeRole',
                                message: 'Please enter which role you\'d like to assign to the selected employee:',
                                choices:  updateArrayRole
                            },
                        ])
                        .then((answer) => {
                            const chosenRole = answer.updateEmployeeRole;
                            // assign chosen role as role id to update
                            const roleIdUpdate = updateArrayRole.indexOf(chosenRole)+1;
                            // assign chosen namem as employee id to update
                            const employeeNameIdUpdate = updateArrayName.indexOf(chosenName)+1;

                            execQuery(`UPDATE employee_table SET role_id = ${roleIdUpdate} WHERE id = ${employeeNameIdUpdate}`
                                    , (err, res) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log(color,`Updated role for employee: ${chosenName}.`);
                                            prompt ( );
                                        };
                            });
                        }); 
                    };
                });
            });
        };
    });
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
    // console.log(color , greeting);
    prompt();
};

init();