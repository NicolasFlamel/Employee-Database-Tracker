require('dotenv').config();
const getConnection = require('./config/connection');
const { prompt } = require('inquirer');
const cTable = require('console.table');
const questions = require('./lib/questions');

// sets up mysql connection
const connection = getConnection();

const init = async () => {
    mainMenu();
}

// loads main menu
const mainMenu = async () => {
    const answers = await prompt(questions.getMenu());
    navigation(answers.menuChoice);
}

// calls specific function depending on department selected
const navigation = async menuChoice => {
    switch (menuChoice) {
        case 'department':
        case 'role':
        case 'employee':
            await viewTable(menuChoice);
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
            return;
    }

    mainMenu();
}

// loads table depending on table name passed in
const viewTable = async table => {
    const query = `SELECT * FROM ${table}`;
    // pass in connection through function
    const [results, buffer] = await (await connection).execute(query);
    console.table('', results);
}

// adds new department to department table
const addDepartment = async () => {
    const answers = await prompt(questions.newDepartment());
    const { departmentName } = answers;
    const query = 'INSERT INTO department (name) VALUES (?)';

    await (await connection).execute(query, [departmentName]);

    console.log(`The ${departmentName} department has been added\n`);
}

// adds new role to role table
const addRole = async table => {
    //saves all department data
    const [departments, buffer] =
        await (await connection).execute('SELECT * FROM department');

    // changes 'id' to 'value' to be used in inquirer format
    const choices = departments.map(obj => ({ name: obj.name, value: obj.id }));
    const answers = await prompt(questions.newRole(choices));

    const query = `INSERT INTO ${table} (title, salary, department_id) VALUES (?, ?, ?)`;
    const values = [answers.title, answers.salary, answers.department_id];

    await (await connection).execute(query, values);

    console.log(`The ${values[0]} role has been added\n`);
}

// adds new employee to employee table
const addEmployee = async () => {
    const query = '';

    const [results, buffer] = await (await connection).execute(query);
    console.table('', results);
}

// updates employee role
const updateEmployeeRole = async () => {
    const query = '';

    const [results, buffer] =
        await (await connection).execute(query);

    console.table('', results);
}

const exit = async () => {
    (await connection).end();
}

init();