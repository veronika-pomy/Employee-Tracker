INSERT INTO department_table (department_name)
VALUES ("Admin"),
       ("Legal"),
       ("Marketing"),
       ("Sales");
       
INSERT INTO role_table (title, salary, department_id)
VALUES ("Administrative Assistant", 60000, 1),
       ("Sales Associate", 65000, 4),
       ("Legal Intern", 100000, 2),
       ("Sales Lead", 95000, 4),
       ("Marketing Intern", 55000, 3),
       ("Marketing Manager", 80000, 3);

-- Temporarily disabling referential constraints to insert manager_id data into employee_table--    
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Jones", 2, 2),
       ("Carrie", "Reed", 4, null),
       ("Lois", "James", 1, null),
       ("Kyle", "Wilson", 3, null),
       ("Dan", "Smith", 6, null),
       ("Tom", "Arnold", 5, 5),
       ("Trevor", "Blake", 2, 2);

-- Enabling referential constraints -- 
SET FOREIGN_KEY_CHECKS = 1;