// establish connection
const CONNECTION_QUERY = {
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass',
    database: 'employees_db'
};

// view all departments 
const DEPARTMENT_QUERY = `SELECT
                                  * 
                          FROM 
                                  department_table
                          ORDER BY 
                                  department_table.id;
`;

// view all roles
const ROLE_QUERY = `SELECT 
                                  role_table.id, 
                                  role_table.title, 
                                  department_table.department_name, 
                                  role_table.salary
                    FROM 
                                  role_table 
                    JOIN 
                                  department_table
                    ON 
                                  role_table.department_id = department_table.id
                    ORDER BY 
                                  role_table.id;
`;

// view all employees
const EMPLOYEES_QUERY = `SELECT 
                                  e.id as employee_id,
                                  e.first_name as employee_first_name,
                                  e.last_name as employee_last_name,
                                  role_table.title as employee_role,
                                  department_table.department_name as employee_department,
                                  role_table.salary as employee_salary,
                                  CONCAT(m.first_name, ' ', m.last_name) as employee_manager
                        FROM 
                                  employee_table e
                        LEFT JOIN 
                                  employee_table m
                        ON 
                                  e.manager_id = m.id
                        JOIN
                                role_table
                        ON 
                                e.role_id = role_table.id
                        JOIN 
                                department_table
                        ON 
                                role_table.department_id = department_table.id
                        ORDER BY 
                                e.id;
`;

// add a new department
const ADD_DEPARTMENT = `INSERT INTO 
                                department_table (department_name)
                        VALUES
`;

// add a role 
const ADD_ROLE = `INSERT INTO
                                role_table (title, salary, department_id)
                VALUES
`;

// add an employee
const ADD_EMPLOYEE = `INSERT INTO 
                                employee_table (first_name, last_name, role_id, manager_id)
                        VALUES          
`;

// select department name from department table 

//

//

//

//

module.exports = { 
        CONNECTION_QUERY, 
        DEPARTMENT_QUERY, 
        ROLE_QUERY, 
        EMPLOYEES_QUERY, 
        ADD_DEPARTMENT, 
        ADD_ROLE, 
        ADD_EMPLOYEE
};