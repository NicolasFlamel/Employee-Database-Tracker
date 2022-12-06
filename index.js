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
        .prompt(questions.getMenu())
        .then(answers => {
            const choice = answers.menuChoice;

            switch (choice) {
                case 'department':
                case 'role':
                case 'employee':
                    viewTable(choice);
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole('role');
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

const viewTable = table => {
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
    inquirer.prompt(questions.newDepartment()).then(answers => {
        const { departmentName } = answers;
        const query = 'INSERT INTO department (name) VALUES (?)'

        connection.query(query, departmentName, (err, results) => {
            if (err) {
                console.error(err);
            }

            console.table('', results);

            mainMenu();
        });
    });
}

const addRole = table => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error(err);
        }
        
        const choices = results.map(obj => {
            return { name: obj.name, value: obj.id }
        })

        inquirer
            .prompt(questions.newRole(choices))
            .then(answers => {
                const query = `INSERT INTO ${table} (title, salary, department_id) VALUES (?, ?, ?)`;
                const values = [answers.title, answers.salary, answers.department_id]

                connection.query(query, values, (err, results) => {
                    if (err) {
                        console.error(err);
                    }

                    console.table('', results);

                    mainMenu();
                });
            });
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