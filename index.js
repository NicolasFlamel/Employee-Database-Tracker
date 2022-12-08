require('dotenv').config();
const Query = require('./lib/Query')
const { prompt } = require('inquirer');
const cTable = require('console.table');
const getConnection = require('./config/connection');
const questions = require('./lib/questions');

// sets up mysql connection
const connection = getConnection();

// loads main menu
const mainMenu = async () => {
    const { menuChoice } = await prompt(questions.getMenu());
    const { subMenuChoice } = await prompt(questions.getSubMenu(menuChoice));
    navigation(subMenuChoice);
}

// calls specific function depending on department selected
const navigation = async menuChoice => {
    switch (menuChoice) {
        case 'department':
        case 'role':
        case 'employee':
            await viewTable(menuChoice);
            break;
        case 'addDepartment':
            await addDepartment();
            break;
        case 'addRole':
            await addRole();
            break;
        case 'addEmployee':
            await addEmployee();
            break;
        case 'updateEmployeeRole':
            await updateEmployeeRole();
            break;
        case 'updateEmployeeManager':
            await updateEmployeeManager();
            break;
        case 'return':
            break;
        case 'exit':
            exit();
            return;
    }

    mainMenu();
}

// loads table depending on table name passed in
const viewTable = async table => {
    const query = new Query(table);

    const [results] = await (await connection).query(query.viewTable());
    console.table('', results);
}

const getRoles = async (query, exclude) => {
    // gets role table
    const [roleTable] = await (await connection).query(
        query.getTable('role', exclude)
    );
    // turns table into useable inquirer choices
    const roleChoices = roleTable.map(obj => (
        { name: obj.title, value: obj.id }
    ));

    const { role } = await prompt(questions.selectRole(roleChoices));

    return role;
}

const getEmployees = async (query, exclude) => {
    // gets employee table
    const [employeeTable] = await (await connection)
        .query(query.getTable('employee', exclude));
    // turns table into useable inquirer choices
    const empChoices = employeeTable.map(obj => (
        { name: `${obj.first_name} ${obj.last_name}`, value: obj.id }
    ));

    // only time 'hasNull' in questions obj should be true is when 
    // exclude variable is passed in
    const { employeeId } = await prompt(questions.selectEmployee(empChoices, exclude));

    return employeeId;
}

// adds new department to department table
const addDepartment = async () => {
    const answers = await prompt(questions.newDepartment());
    const { departmentName } = answers;
    const query = new Query('department')

    await (await connection).query(query.addToTable(), [departmentName]);

    console.log(`The ${departmentName} department has been added\n`);
}

// adds new role to role table
const addRole = async () => {
    const query = new Query('role');

    // saves all department table data
    const [departments] = await (await connection).query(query.getTable('department'));

    // changes 'id' to 'value' to be used in inquirer format
    const choices = departments.map(obj => ({ name: obj.name, value: obj.id }));
    const answers = await prompt(questions.newRole(choices));
    const values = [answers.title, answers.salary, answers.department_id];

    await (await connection).query(query.addToTable(), values);

    console.log(`The ${values[0]} role has been added\n`);
}

// adds new employee to employee table
const addEmployee = async () => {
    const query = new Query('employee');

    const { first_name, last_name } = await prompt(questions.newEmployee());
    const role = await getRoles(query);
    const manager = await getEmployees(query);

    const employee = [first_name, last_name, role, manager];

    await (await connection).query(query.addToTable(), employee);
}

// updates employee role
const updateEmployeeRole = async () => {
    const query = new Query('employee');
    const employeeId = await getEmployees(query);

    const [[results]] = await (await connection).query(
        `SELECT role_id FROM employee WHERE id = ${employeeId}`
    );
    const excludeId = results.role_id;

    const newRole = await getRoles(query, excludeId);

    await (await connection)
        .query(query.updateEmployee('role'), [newRole, employeeId]);
}

const updateEmployeeManager = async () => {
    const query = new Query('employee');
    const employeeId = await getEmployees(query);

    // exclude himself as manager
    const newManager = await getEmployees(query, employeeId);

    await (await connection)
        .query(query.updateEmployee('manager'), [newManager, employeeId]);
}

const deleteFromTable = async () => {

}

const exit = async () => {
    (await connection).end();
}

mainMenu();