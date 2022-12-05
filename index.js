const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = require('./lib/questions');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password0123',
    database: 'employees_db'
});

const onLoad = () => {
    mainMenu();
}

const mainMenu = () => {
    inquirer
        .prompt(questions.mainMenu)
        .then(answers => {
            switch (answers.menuChoice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
            }
        });

}

const viewDepartments = () => {
    connection.query(
        'SELECT * FROM department', (err, results) => {
            if (err) {
                console.error(err);
            }
            console.table('', results);
            exit();
        }
    );
    
}

const exit = () => {
    connection.end();
}

onLoad();