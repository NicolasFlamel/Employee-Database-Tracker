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
            const choice = answers.menuChoice;

            switch (choice) {
                case 'department':
                case 'role':
                case 'employee':
                    viewInfo(choice);
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
                case 'Exit':
                    exit();
                    break;
            }
        });

}

const viewInfo = (table) => {
    const query = `SELECT * FROM ${table}`

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.table('', results);

        mainMenu();
    });
}

const addDepartment = () => {
    const query = ''

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.table('', results);

        mainMenu();
    });
}

const addRole = () => {
    const query = ''

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.table('', results);

        mainMenu();
    });
}

const addEmployee = () => {
    const query = ''

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.table('', results);

        mainMenu();
    });
}

const updateEmployeeRole = () => {
    const query = ''

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.table('', results);

        mainMenu();
    });
}

const exit = () => {
    connection.end();
}

onLoad();