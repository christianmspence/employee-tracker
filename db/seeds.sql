INSERT INTO departments (name)
VALUES
('Executive'),
('Finanace'),
('Sales'),
('Human Resources'),
('Tech'),
('Design');

INSERT INTO roles (title, salary, department_id)
VALUES
('Graphic Designer', 50.00, 6),
('Full-Stack Developer', 70.00, 5),
('Payroll', 50.00, 4),
('Sales Associate', 40.00, 3),
('Accountant', 60.00, 2),
('CFO', 80.00, 2),
('CEO', 100.00, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
VALUES
('James', 'Water', 1, 6, 6),
('Peter', 'Firth', 1, 6, 6),
('Grant', 'Foster', 2, 5, 6),
('John', 'Kim', 2, 5, 5),
('Matthew', 'Cheezem', 3, 4, 4),
('Linda', 'Spence', 3, 4, 4),
('Micah', 'Cheezem', 4, 3, 3),
('Eric', 'Smeal', 4, 3, 3),
('Savannah', 'Woodell', 4, 3, 3),
('Laura', 'Judd', 5, 2, 2),
('Luke', 'Stimmerman', 5, 2, 2),
('Clayton', 'Burklin', 6, 1, 2),
('Big', 'Labowski', 7, NULL, 1);