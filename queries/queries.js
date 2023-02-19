const CONNECTION_QUERY = {
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass',
    database: 'employees_db'
};

const NEW_QUERY = {

};

// view all departments

// view all roles

// view all employees

// add a department
  // prompt to enter a department that will be added to databse

// add a role
  // prompt to enter name, salary, and department for a role
  // add role is added to the database

// add an employee 
  // prompt to enter the employees first name, last name, role, manager
  // add employee to the database

// update an employee role
  // prompt to select and employee to update and their role
  // this information is updated in a database

module.exports = { CONNECTION_QUERY, NEW_QUERY };