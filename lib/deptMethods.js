const { initApp } = require('../app');
const inquirer = require('inquirer');
const db = require('../db/connection')

module.exports = { allDepts, addDept }