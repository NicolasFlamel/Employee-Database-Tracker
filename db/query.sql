-- SELECT a.first_name AS employee, b.first_name AS Manager
-- FROM employee a, employee b 
-- WHERE a.id = b.manager_id;

-- SELECT a.id,
--     CONCAT(a.first_name, " ", a.last_name) AS employee, 
--     role.title AS role,
--     CONCAT(b.first_name, " ", b.last_name) AS Manager
-- FROM employee a
-- LEFT JOIN employee b ON a.manager_id = b.id
-- LEFT JOIN role ON a.role_id = role.id;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Yikers', 'MIkers', 1, 1)