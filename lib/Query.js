class Query {
    constructor(table) {
        this.table = table;
    }

    getTable(table, exclude) {
        if (exclude)
            return `SELECT * FROM ${table} WHERE id != ${exclude}`
        else if (table)
            return `SELECT * FROM ${table}`
        else return `SELECT * FROM ${this.table}`
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
                query = 'SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, " ", b.last_name) AS Manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id JOIN role ON a.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY a.id ASC;';
                break;
        }

        return query;
    }

    addToTable() {
        let query;

        switch (this.table) {
            case 'department':
                query = 'INSERT INTO department (name) VALUES (?)'
                break;
            case 'role':
                query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
                break;
            case 'employee':
                query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                break;
        }

        return query;
    }


    updateEmployee(column) {
        let query = 'UPDATE employee SET ';

        if (column == 'role') {
            query += 'role_id = ?'
        } else if (column == 'manager') {
            query += 'manager_id = ?'
        }

        query += ' WHERE id = ?'

        return query
    }

    deleteFromTable() {
        let query = `DELETE FROM ${this.table} WHERE id = ${id}`

        // switch (this.table) {
        //     case 'department':
        //         query = 'INSERT INTO department (name) VALUES (?)'
        //         break;
        //     case 'role':
        //         query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
        //         break;
        //     case 'employee':
        //         query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        //         break;
        // }

        return query
    }
}

module.exports = Query;