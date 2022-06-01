// require all packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


// create database connection

const db = mysql.createConnection(
    {
        host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Drowssap',
      database: 'empTracker_db'
    },
    console.log(`Connected to employee tracker database`)
);

const mainMenu = {
  type: "list",
  message: "What could I do for you?",
  name: "mainMenu",
  choices: ["View All Employees's", " Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
};

const init = () => {
  console.log("***********************************************************")
  console.log("*                                                         *")
  console.log("*               Welcome to Employee Manager               *")
  console.log("*                                                         *")
  console.log("***********************************************************")
  openMenu()
};

const openMenu = () => {
  inquirer
  .prompt(mainMenu)
  .then((response) => {
    switch (response.mainMenu) {
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        addEmployeeName();
        break;
      case 'Update Employee Role':
        updateEmp();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewDepts();
        break;
      case 'Add Department':
        addDept();
        break;
      case 'Quit':
        process.exit();
    }
  })
};

const viewDepts = () => {
  const sql = "SELECT * FROM department";

  db.promise().query(sql)
  .then(([rows,fields]) => {
    const table = consoleTable.getTable(rows);
    console.log(table);
  })

  .catch(console.log)
  .then( () => openMenu());
};

const deptPrompt = {
  type: "input",
  message: " Enter the name of the new department",
  name: "deptName",
};

const addDept = () => {
  inquirer
  .prompt(deptPrompt)
  .then((response) => {
    genDept(response);
  })
};

