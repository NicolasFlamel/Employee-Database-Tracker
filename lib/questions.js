const mainMenu = [
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


module.exports = { 
    mainMenu,
};