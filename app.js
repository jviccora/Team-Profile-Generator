const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let id = 1;
const team = [];
const questions = [
    {
        type: "list",
        name: "empType",
        message: "What type of employee would you like to add?",
        choices: ['Manager', 'Engineer', 'Intern', 'Done']
    }
];

const mgrQestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email address?"
    },
    {
        type: "input",
        name: "officeNum",
        message: "What is the manager's office number?"
    }
];

const engQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?"
    }
];

function ask() {
    inquirer.prompt(questions).then(answers => {
        if(answers.empType === "Manager"){
            inquirer.prompt(mgrQestions).then(mgrAnswers => {
                team.push(new Manager(mgrAnswers.name, id++, mgrAnswers.email, mgrAnswers.officeNum));
                ask();
            });
        }else if(answers.empType === "Engineer"){
            inquirer.prompt(engQuestions).then(engAswers => {
                team.push(new Engineer(engAswers.name, id++, engAswers.email, engAswers.github));
                ask();
            });
        }else if(answers.empType === "Intern"){
            inquirer.prompt(internQuestions).then(internAnswers => {
                team.push(new Intern(internAnswers.name, id++, internAnswers.email, internAnswers.school));
                ask();
            });
        }else{
            // const htmlRenderer = new render();
            const html = render(team);
            if(!fs.existsSync(OUTPUT_DIR)){
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFileSync(outputPath, html);
        }
    });
}

ask();
