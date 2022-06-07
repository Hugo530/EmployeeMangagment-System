use employees;

INSERT INTO department
    (name)
VALUES
    ('Manager'),
    ('Reciptionist'),
    ('Valet'),
    ('Maids');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Night Manager', 80000, 1),
    ('Day Manager', 85000, 1),
    ('Night Reciptionist', 45000, 2),
    ('Day Reciptionist', 50000, 2),
    ('Valet', 20000, 3),
    ('Day Maids', 15000, 3),
    ('Night Maids', 15000, 4);
    

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Who', 'Dat', 1, NULL),
    ('Mike', 'Larry', 2, 1),
    ('Marco', 'Polo', 3, NULL),
    ('Jennifer', 'Lopez', 4, 3),
    ('Hilda', 'Lucatero', 5, NULL),
    ('Robert', 'Lucatero', 6, 5),
    ('Gigi', 'Sanchez', 7, NULL);
    
        