const getMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'View department, role, or employee information',
                    value: 'viewTables'
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

    if (menuChoice == 'viewTables') {
        questions = viewTable();
        return questions;
    } else if (menuChoice == 'addData') {
        return addData();
    } else if (menuChoice == 'updateData') {
        return updateData();
    } else return null;
}

const viewTable = () => {
    const questions = [
        {
            type: 'list',
            name: 'subMenuChoice',
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
            message: 'What do you want to do?',
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
            message: 'What do you want to do?',
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

const selectEmployee = (employeeList, hasNull) => {
    const questions = [
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please choose an employee',
            choices: employeeList,
            when(answers) {
                return !hasNull;
            }
        },
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please choose an employee',
            choices: [
                { name: 'Has no manager', value: null },
                ...employeeList,
            ],
            when(answers) {
                return hasNull;
            }
        }
    ]

    return questions
}

const selectRole = (roleList) => {
    const questions = [
        {
            type: 'list',
            name: 'role',
            message: 'Please choose a role',
            choices: roleList
        }
    ]

    return questions;
}

module.exports = {
    getMenu,
    getSubMenu,
    newDepartment,
    newRole,
    newEmployee,
    selectEmployee,
    selectRole
};