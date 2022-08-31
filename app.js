const inquirer = require('inquirer');
const db = require('./db/connection');

// Inital Prompt - Main Menu
function initApp() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "View all departments",
                "Add department",
                "View all roles",
                "Add role",
                "View all employees",
                "Add employee",
                "Update employee role",
                "Update employees manager",
                "View employees by manager",
                "View employees by department",
                "Exit"
            ],
            message: "What would you like to do?",
            name: "option"
        })
        .then(function (result) {
            console.log("You entered: " + result.option);

            switch (result.option) {
                case "View all departments":
                    allDepts();
                    break;
                case "Add department":
                    addDept();
                    break;
                case "View all roles":
                    allRoles();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "View all employees":
                    allEmployees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Update employees manager":
                    updateManager();
                    break;
                case "View employees by manager":
                    empByMan();
                    break;
                case "View employees by department":
                    empByDept();
                    break;

                default:
                    process.exit();
            }
        });
}

// View all departments
function allDepts() {
    let query = "SELECT * FROM departments";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initApp();
    });
}

// add department
function addDept() {
    inquirer
        .prompt({
            type: 'text',
            name: 'dept_name',
            message: 'Please enter the name of the department: '
        })
        .then(function (data) {
            db.query(
                `INSERT INTO departments (name)
                VALUES(?)`,
                [data.dept_name],
                function (err, results, fields) {
                    if (err) throw err;
                    console.log("Department Added!");
                    initApp();
                })
        })
}

// view all roles
function allRoles() {
    let query = "SELECT * FROM roles";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initApp();
    });
}

// add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "role_name"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "role_salary"
            },
            {
                type: "input",
                message: "What is the department id number for this role?",
                name: "dept_id"
            }
        ])
        .then(function (data) {
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
                [data.role_name, data.role_salary, data.dept_id],
                function (err, res) {
                    if (err) throw err;
                    console.table("Role added!");
                    initApp();
                });
        });
}

//view all employees
function allEmployees() {
    let query = "SELECT * FROM employees";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initApp();
    });
}

// add a employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of the employee?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the last name of the employee?",
                name: "last_name"
            },
            {
                type: "input",
                message: "What is the employees role ID?",
                name: "role_id"
            },
            {
                type: "input",
                message: "What is the employees manager ID?",
                name: "manager_id"
            }
        ])
        .then(function (data) {
            db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [data.first_name, data.last_name, data.role_id, data.manager_id],
                function (err, res) {
                    if (err) throw err;
                    console.table("Employee added!");
                    initApp();
                });
        });
}

// update employee role
function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "empUpdate"
            },

            {
                type: "input",
                message: "Please select a new role ID?",
                name: "updateRole"
            }
        ])
        .then(function (data) {
            db.query('UPDATE employees SET role_id=? WHERE first_name= ?',
                [data.updateRole, data.empUpdate],
                function (err, res) {
                    if (err) throw err;
                    console.table("Employee role updated");
                    initApp();
                });
        });
}

// update employees manager
function updateManager() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "empUpdate"
            },

            {
                type: "input",
                message: "Please select a new manager ID?",
                name: "updateMan"
            }
        ])
        .then(function (data) {
            db.query('UPDATE employees SET manager_id=? WHERE first_name= ?',
                [data.updateMan, data.empUpdate],
                function (err, res) {
                    if (err) throw err;
                    console.table("Employees manager ID updated");
                    initApp();
                });
        });
}

//view employees by manager
function empByMan() {
    inquirer
        .prompt(
            {
                type: "input",
                message: "Please select a manager ID",
                name: "manager_id"
            })
        .then(function (data) {
            db.query('SELECT * FROM employees WHERE manager_id=?',
                [data.manager_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    initApp();
                });
        });
}

//view employees by department
function empByDept() {
    inquirer
        .prompt(
            {
                type: "input",
                message: "Please select a department ID",
                name: "department_id"
            })
        .then(function (data) {
            db.query('SELECT * FROM employees WHERE department_id=?',
                [data.department_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    initApp();
                });
        });
}

module.exports = { initApp }