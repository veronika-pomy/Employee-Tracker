DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department_table (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role_table (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id)
  REFERENCES department_table(id)
  ON DELETE SET NULL
);

CREATE TABLE employee_table (
  id INT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id)
  REFERENCES role_table(id) 
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee_table(id) 
  ON DELETE SET NULL
);