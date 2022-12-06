class Query {
    constructor(table) {
        this.table = table;
    }

    viewTable() {
        let query;

        switch (this.table) {
            case 'department':
                query = 'SELECT * FROM department'
                break;
            case 'role':
                query = 'SELECT role.id, title, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC;'
                break;
            case 'employee':
                query = 'SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, " ", b.last_name) AS Manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id JOIN role ON a.role_id = role.id JOIN department ON department.id = role.department_id;';
                break;
        }

        return query;
    }

    addToTable() {

    }

    updateTable() {

    }

    deleteFromTable() {

    }
}

module.exports = Query;