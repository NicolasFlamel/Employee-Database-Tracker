const getMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'department',
                },
                {
                    name: 'View all roles',
                    value: 'role',
                },
                {
                    name: 'View all employees',
                    value: 'employee',
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
                    name: 'Update employee\'s role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Update employee\'s manager',
                    value: 'updateEmployeeManager'
                },
                {
                    name: 'Delete a department, role, or employee',
                    value: 'deleteData'
                },
                {
                    name: 'Exit',
                    value: 'exit'
                }
            ]
        },
        {
            type: 'list',
            name: 'deleteDataChoice',
            message: 'What do you want to delete?',
            choices: [
                {
                    name: 'Delete a department',
                    value: 'deleteDepartment'
                },
                {
                    name: 'Delete a role',
                    value: 'deleteRole'
                },
                {
                    name: 'Delete an employee',
                    value: 'deleteEmployee'
                },
                {
                    name: 'Return',
                    value: 'return'
                }
            ],
            when(answers) {
                return answers.menuChoice == 'deleteData'
            }
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
    ]

    return questions;
}

const selectDepartment = (roleList) => {
    const questions = [
        {
            type: 'list',
            name: 'departmentId',
            message: 'Please choose a department',
            choices: roleList

        }
    ]

    return questions;
}

const selectRole = (roleList) => {
    const questions = [
        {
            type: 'list',
            name: 'roleId',
            message: 'Please choose a role',
            choices: roleList
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

const selectManager = (employeeList) => {
    const questions = [
        {
            type: 'list',
            name: 'managerId',
            message: 'Please choose an employee',
            choices: [
                ...employeeList,
                { name: 'None', value: null }
            ],
        }
    ]

    return questions
}

module.exports = {
    getMenu,
    newDepartment,
    newRole,
    newEmployee,
    selectDepartment,
    selectRole,
    selectEmployee,
    selectManager
};