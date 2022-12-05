const mainMenu = [
    {
        type: 'list',
        name: 'menuChoice',
        message: 'What do you want to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
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