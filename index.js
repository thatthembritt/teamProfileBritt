const inquirer = require("inquirer");
const Manager = require("./library/Manager");
const Intern = require("./library/Intern");
const Engineer = require("./library/Engineer");
const generateHTML = require("./utils/generateHTML");
const fs = require("fs");
let employeeDataArr = [];

start();

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add a team member?",
        name: "option",
        choices: ["Add Manager", "Add Intern", "Add Engineer", "Exit App"],
      },
    ])
    .then((response) => {
      switch (response.option) {
        case "Add Manager":
          addManager();
          break;

        case "Add Intern":
          addIntern();
          break;

        case "Add Engineer":
          addEngineer();
          break;
        default:
          exitApp();
      }
    });
}

function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Manager Name: ",
      },
      {
        type: "input",
        name: "id",
        message: "Enter Manager ID: ",
      },
      {
        type: "input",
        name: "email",
        message: "Enter Manager Email: ",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager Office Number: ",
      },
    ])
    .then((response) => {
      const newHire = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      employeeDataArr.push(newHire);
      start();
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Engineer name: ",
      },
      {
        type: "input",
        name: "id",
        message: "Enter Engineer ID: ",
      },
      {
        type: "input",
        name: "email",
        message: "Enter Engineer Email: ",
      },
      {
        type: "input",
        name: "gitHub",
        message: "Enter Engineer GitHub: ",
      },
    ])
    .then((response) => {
      const newHire = new Engineer(
        response.name,
        response.id,
        response.email,
        response.gitHub
      );
      employeeDataArr.push(newHire);
      start();
    });
}
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Intern name: ",
      },
      {
        type: "input",
        name: "id",
        message: "Enter Intern ID: ",
      },
      {
        type: "input",
        name: "email",
        message: "Enter Intern Email: ",
      },
      {
        type: "input",
        name: "schoolName",
        message: "Enter Intern School Name: ",
      },
    ])
    .then((response) => {
      const newHire = new Intern(
        response.name,
        response.id,
        response.email,
        response.schoolName
      );
      employeeDataArr.push(newHire);
      start();
    });
}

function exitApp() {
  console.log(employeeDataArr);
  fs.writeFileSync("index.html", generateHTML(employeeDataArr), function (err) {
    if (err) throw err;
  });
  console.log("File generated");
  process.exit(0);
}
