// establish connection
const CONNECTION_QUERY = {
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass',
    database: 'employees_db'
};

// view all departments 
const DEP_TABLE_QUERY = `SELECT
                                  * 
                          FROM 
                                  department_table
                          ORDER BY 
                                  department_table.id;
`;

// view all roles
const ROLE_TABLE_QUERY = `SELECT 
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
const EMP_TABLE_QUERY = `SELECT 
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
const QUERY_DEPT_NAME = `

SELECT department_name FROM department_table ORDER BY department_table.id;

`; 

// select job title from role table
const QUERY_TITLE = `

SELECT title FROM role_table ORDER BY role_table.id;

`;

// select employee name from employee table 

const QUERY_EMP_NAME = `
  
SELECT CONCAT(first_name, ' ', last_name) as employee FROM employee_table ORDER BY employee_table.id;

`;

module.exports = { 
        CONNECTION_QUERY, 
        DEP_TABLE_QUERY, 
        ROLE_TABLE_QUERY, 
        EMP_TABLE_QUERY, 
        ADD_DEPARTMENT, 
        ADD_ROLE, 
        ADD_EMPLOYEE,
        QUERY_DEPT_NAME,
        QUERY_TITLE,
        QUERY_EMP_NAME
};