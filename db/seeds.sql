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

SET FOREIGN_KEY_CHECKS = 0;

-- Temporarily disabling referential constraints (set FOREIGN_KEY_CHECKS to 0) is useful when you need to re-create the tables and load data in any parent-child order.

-- Without this option, it may require a lot of effort to define the correct parent-child order especially if you have a lot of tables, and a table can be a parent for some tables, and a child for others.

-- But as a result, you can insert data that violate foreign key constraints, and when you enable the referential constraints (set FOREIGN_KEY_CHECKS to 1), MySQL does not re-validate the inserted rows.

-- As an alternative, you can firstly create tables without foreign key constraints, load data and then create foreign keys using ALTER TABLE statements.

-- Null for those employees who do not have a manager at this time. --    

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Jones", 2, 2),
       ("Carrie", "Reed", 4, Null),
       ("Lois", "James", 1, Null),
       ("Kyle", "Wilson", 3, Null),
       ("Dan", "Smith", 6, Null),
       ("Tom", "Arnold", 5, 5),
       ("Trevor", "Blake", 2, 2);    

SET FOREIGN_KEY_CHECKS = 1;