use employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
    ("Engineering"),
    ("Legal"),
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3),
    ("Account Manager", 160000, 4),
    ("Accountant", 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Goodwin", "1", null),
    ("Felicity", "Kim", "2", 1),
    ("Juliette", "Ali", "3", null),
    ("Yasir", "Hobbs", "4", 3),
    ("Ted", "Lindsay", "5", null),
    ("Craig", "Odling", "6", 5),
    ("Gerald", "Curry", "7", null),
    ("Kade", "Harper", "8", 7);