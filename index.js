
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const departments = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Juventus131!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// Create Inquirer prompts
const init = () => {
    // startMenu = () => {
    //     return 
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would like to do?',
                choices: departments
            },
            {
                type: 'input',
                name: 'Exit',
                message: 'Do you want to exit?'
            }

        ])
        .then(answers => {
            console.log(`Now viewing ${answers.choice}`);
            switch (answers.choice) {
                case 'View All Departments': viewDept();
                    break;
                case 'View All Roles': viewRoles();
                    break;
                case 'View All Employees': viewEmployees();
                    break;

                case 'Add a Department': addDepartment();
                    break;
                case 'Add a Role': addRoles();
                    break;
            }
        })
};

// Prompt to view Department database
init();
const viewDept = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// Prompt to view Employee roles
const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// Prompt to view Employees
const viewEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// Prompt to add a new
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What Deparment would you like to add?',
            name: 'addDepartment'
        }
    ]).then(answers => {
        db.query(`INSERT INTO department(d_name)VALUES(?)`, answers.addDepartment, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                db.query(`SELECT * FROM department`, (err, results) => {
                    err ? console.error(err) : console.table(results);
                    init();
                })
            }
        })
    })
};

const addRoles = () => {
    const newRole = () => db.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let roleNames = rows[0].map(obj => obj.name);//copys Roles data and adds a new entry to index 0
            return roleNames
        })
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary of this role?',
                name: 'roleSalary'
            },

            {
                type: 'list',
                message: 'What department does this new role belong in?',
                name: 'addDepartment',
                choices: newRole
            }
        ]).then(answers => {
            db.promise().query(`SELECT * FROM department WHERE name =?`, answers.addDepartment).then(answers => {
                let roleID = answers[0].map(obj.id);
                // console.log(roleID);
                return roleID[0]
            })
                .then(roleID => {
                    db.prome().query(`INSERT INTO roles(title,salary,department_id)VALUES(?,?,?)`, [answers.roleTitle, answers.roleSalary, roleID]);
                    init()
                })
        })
};





    // async function viewStartMenu() {
    //     await startMenu();
    // }

    // viewStartMenu();
