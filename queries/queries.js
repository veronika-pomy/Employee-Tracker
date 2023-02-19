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
                            employees_db.department_table
                          ORDER BY 
                            department_table.id`;

// view all roles
const ROLE_QUERY = `SELECT 
                      role_table.id, 
                      role_table.title, 
                      department_table.department_name, 
                      role_table.salary
                    FROM 
                      employees_db.role_table 
                    JOIN 
                      employees_db.department_table
                    ON 
                      employees_db.role_table.department_id = department_table.id
                    ORDER BY 
                      role_table.id`;

// view all employees
const EMPLOYEES_QUERY = `SELECT 
                          employee_table.id,
                          employee_table.first_name,
                          employee_table.last_name,
                          role_table.title,
                          department_table.department_name,
                          role_table.salary,
                          employee_table.manager_id as manager_name
                        FROM 
                          employees_db.employee_table 
                        JOIN
                          employees_db.role_table
                        ON 
                          employees_db.employee_table.role_id = role_table.id
                        JOIN 
                          employees_db.department_table
                        ON 
                          employees_db.role_table.department_id = department_table.id
                        ORDER BY 
                          employee_table.id
`;

module.exports = { CONNECTION_QUERY, DEPARTMENT_QUERY, ROLE_QUERY, EMPLOYEES_QUERY };