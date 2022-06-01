// require all packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { resourceLimits } = require('worker_threads');


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

const genDept = (data) => {
  const {deptName} = data;
  const params = [deptName];
  const sql = `INSERT INTO department (name) VALUES (?)`;
  db.promise().query(sql, params)
  .then(`Added new department: ${deptName}`)
  .catch(console.log)
  .then( () => openMenu());
};

const viewRoles = () => {
  const sql = `SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role JOIN department on a role.dept_id = department.id`;

  db.promise().query(sql)
  .then(([rows, fields]) => {
    const table = consoleTable.getTable(rows);
    console.log(table);
  })

  .catch(console.log)
  .then( () => openMenu());
};

const addRole = () => {
  let sql = "SELECT * FROM department";
  db.query(sql, (err, result) => {
      if (err) throw err;
      inquirer.prompt([
          {
              type: "input",
              message: "What is the title of this role?",
              name: "roleTitle",
          },
          {
              type: "number",
              message: "What is the salary for this position?",
              name: "roleSalary",
          },
          {
              type: "list",
              message: "Please choose a department",
              // choices uses a function to get data from the department table so it can build a list of the department names for the user to pick from
              choices: () => {
                  const choices = [];
                  for (let i = 0; i < result.length; i++) {
                      choices.push(result[i].name);
                  }
                  return choices;
              },
              name: "department"
          }
      ]).then(answer => {
          let dept_id; 
          for (let i = 0; i < result.length; i++) {
              if (result[i].name === answer.department) {
                  dept_id = result[i].id;
              }
          }
          sql = "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)";
          db.query(sql, [answer.roleTitle, answer.roleSalary, dept_id], (err, res) => {
              if (err) throw err;

              openMenu();
          });
      });
  });
};

