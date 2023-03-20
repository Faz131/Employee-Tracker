

INSERT INTO department(id,d_name)
VALUE(1,'Sales'),
     (2,'Marketing'),
     (3,'Finance'),
     (4,'IT'),
     (5,'Human Resources');

INSERT INTO roles (id, title,salary,department_id)
            VALUE  (1,'Sales Associate',60000.00,1),
                   (2,'Marketing Manager',80000.00,2),
                   (3,'Finance Manager',70000.00,3),
                   (4,'IT engineer',30000.00,4),
                   (5,'HR Director',85000.00,5);

        
INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
            VALUE     (1, 'John', 'Doe', 2, 4),
                      (2, 'Jane', 'Smith', 1, 4),
                      (3, 'Bob', 'Johnson', 2, 5),
                      (4, 'Sarah', 'Adams', 3, NULL),
                      (5, 'Mike', 'Williams', 3, NULL);