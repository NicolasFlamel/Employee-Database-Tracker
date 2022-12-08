const getMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'View department, role, or employee information',
                    value: 'viewData'
                },
                {
                    name: 'Add a department, role, or employee',
                    value: 'addData'
                },
                {
                    name: 'Update an employee\'s role or manager',
                    value: 'updateData'
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
        }
    ]

    return questions;
}

const getSubMenu = (menuChoice) => {
    let questions;
    switch (menuChoice) {
        case 'viewData':
            questions = viewData();
            break;
        case 'addData':
            questions = addData();
            break;
        case 'updateData':
            questions = updateData();
            break;
        case 'deleteData':
            questions = deleteData();
            break;
        default:
            questions = null;
    }

    return questions;
}

const viewData = () => {
    const questions = [
        {
            type: 'list',
            name: 'subMenuChoice',
            message: 'What do you want to view?',
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
                    name: 'Return',
                    value: 'return'
                }
            ]
        }
    ]

    return questions
}

const addData = () => {
    const questions = [
        {
            type: 'list',
            name: 'subMenuChoice',
            message: 'What do you want to add?',
            choices: [
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
                    name: 'Return',
                    value: 'return'
                }
            ]
        }
    ];

    return questions;
}

const updateData = () => {
    const questions = [
        {
            type: 'list',
            name: 'subMenuChoice',
            message: 'What do you want to update?',
            choices: [
                {
                    name: 'Update employee\'s role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Update employee\'s manager',
                    value: 'updateEmployeeManager'
                },
                {
                    name: 'Return',
                    value: 'return'
                }
            ]
        }
    ];

    return questions;
}

const deleteData = () => {
    const questions = [
        {
            type: 'list',
            name: 'subMenuChoice',
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
    getSubMenu,
    newDepartment,
    newRole,
    newEmployee,
    selectDepartment,
    selectRole,
    selectEmployee,
    selectManager
};