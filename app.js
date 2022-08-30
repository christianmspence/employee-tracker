const inquirer = require('inquirer');
const db = require('./db/connection');

// Inital Prompt - Main Menu
function initApp() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "View departments",
                "Add department",
                "View all roles",
                "Add role",
                "View employees",
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
                case "View departments":
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
module.exports = { initApp }