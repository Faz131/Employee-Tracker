
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
            }
        })
};

init();
const viewDept = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};


    // async function viewStartMenu() {
    //     await startMenu();
    // }

    // viewStartMenu();
