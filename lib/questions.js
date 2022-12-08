const getMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'department'
                },
                {
                    name: 'View all roles',
                    value: 'role'
                },
                {
                    name: 'View all employees',
                    value: 'employee'
                },
                {
                    name: 'Add a department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add a role',
                    value: 'addRole'
                },
                {
                    name: 'Add an employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update an employee\'s role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Update employee\'s manager',
                    value: 'updateEmployeeManager'
                },
                {
                    name: 'Exit',
                    value: 'exit'
                }
            ]
        }
    ]

    return questions;
}

const newDepartment = () => {
    const questions = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'Department name:'
        }
    ]

    return questions
}

const newRole = choiceArr => {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'Role\'s Title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Role\'s Salary:',
            validate(input) {
                const re = new RegExp(`\\d{${input.length}}`);

                if (re.test(input)) {
                    return true;
                }

                throw Error('Please provide a number')
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong to?',
            choices: choiceArr
        }
    ]

    return questions;
}

const newEmployee = (roles, managers) => {
    const questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee\'s last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Employee\'s role:',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who\'s their manager?',
            choices: [
                ...managers,
                { name: 'None', value: undefined }
            ]
        }
    ]

    return questions;
}

const selectEmployee = (employeeList) => {
    const questions = [
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please choose an employee',
            choices: employeeList
        }
    ]

    return questions
}

const selectRole = (roleList) => {
    const questions = [
        {
            type: 'list',
            name: 'newRole',
            message: 'Please choose their new role',
            choices: roleList
        }
    ]

    return questions;
}

module.exports = {
    getMenu,
    newDepartment,
    newRole,
    newEmployee,
    selectEmployee,
    selectRole
};