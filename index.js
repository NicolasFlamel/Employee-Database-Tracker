require('dotenv').config();
const Query = require('./lib/Query')
const { prompt } = require('inquirer');
const cTable = require('console.table');
const getConnection = require('./config/connection');
const { getMenu, newDepartment, newRole, newEmployee, updateEmployeeRole }
    = require('./lib/questions');

// sets up mysql connection
const connection = getConnection();

const init = async () => {
    mainMenu();
}

// loads main menu
const mainMenu = async () => {
    const answers = await prompt(getMenu());
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
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployee();
            break;
        case 'Exit':
            exit();
            return;
    }

    mainMenu();
}

// loads table depending on table name passed in
const viewTable = async table => {
    const query = new Query(table);
    // pass in connection through function
    const [results] = await (await connection).query(query.viewTable());
    console.table('', results);
}

// adds new department to department table
const addDepartment = async () => {
    const answers = await prompt(newDepartment());
    const { departmentName } = answers;
    const query = new Query('department')

    await (await connection).query(query.addToTable(), [departmentName]);

    console.log(`The ${departmentName} department has been added\n`);
}

// adds new role to role table
const addRole = async () => {
    const query = new Query('role');

    // saves all department data
    const [departments] = await (await connection).query(query.getTable('department'));

    // changes 'id' to 'value' to be used in inquirer format
    const choices = departments.map(obj => ({ name: obj.name, value: obj.id }));
    const answers = await prompt(newRole(choices));
    const values = [answers.title, answers.salary, answers.department_id];

    await (await connection).query(query.addToTable(), values);

    console.log(`The ${values[0]} role has been added\n`);
}

// adds new employee to employee table
const addEmployee = async () => {
    // need id, first_name, last_name, role_id, manager_id
    const query = new Query('employee');

    const [roles] = await (await connection).query(query.getTable('role'));
    const [managers] = await (await connection).query(query.getTable('employee'));

    const roleChoices = roles.map(obj => (
        { name: obj.title, value: obj.id }
    ));
    const managerChoices = managers.map(obj => (
        { name: `${obj.first_name} ${obj.last_name}`, value: obj.id }
    ));

    const answers = await prompt(newEmployee(roleChoices, managerChoices));

    // turns answers into array of key-value pair then maps it as an array of values
    const values = Object.entries(answers).map(arr => arr[1]);

    await (await connection).query(query.addToTable(), values);
}

// updates employee role
const updateEmployee = async () => {
    const query = new Query('employee');

    const [employeeTable] = await (await connection).query(query.getTable('employee'));
    const [roleTable] = await (await connection).query(query.getTable('role'));

    const empChoices = employeeTable.map(obj => {
        const employee = {
            name: `${obj.first_name} ${obj.last_name}`,
            value: obj.id
        }

        return employee;
    })
    const roleChoices = roleTable.map(obj => ({ name: obj.title, value: obj.id }));

    const { employeeId, newRole } = await prompt(updateEmployeeRole(empChoices, roleChoices));
    await (await connection).query(query.updateTable('employee'), [newRole, employeeId]);
}

const exit = async () => {
    (await connection).end();
}

init();