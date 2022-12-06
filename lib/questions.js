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
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
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

const newEmployee = (arr) => {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Employee\'s name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Employee\'s role:'
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who\'s their manager?',
            choices: [
                ...arr,
                'None'
            ]
        }
    ]

    return questions;
}

const updateEmployeeRole = () => {
    const questions = [
        {
            type: 'list',
            name: 'employee_id',
            message: 'Please choose an employee',
            choices: arr
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Please choose their new role',
            choices: []
        }
    ]

    return questions;
}

module.exports = {
    getMenu,
    newDepartment,
    newRole,
    newEmployee,
    updateEmployeeRole
};