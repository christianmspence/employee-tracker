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
                "View roles",
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
                // case "Add employee":
                //     addEmployee();
                //     break;
                // case "View departments":
                //     viewDepartment();
                //     break;
                // case "View roles":
                //     viewRoles();
                //     break;
                // case "View employees":
                //     viewEmployees();
                //     break;
                // case "Update employee role":
                //     updateEmployee();
                //     break;
                default:
                    process.exit();
            }
        });
}

// View all departments
function allDepts() {
    // select from the db
    let query = "SELECT * FROM departments";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initApp();
    });
}

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

module.exports = { initApp }