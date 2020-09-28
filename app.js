const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let numManagers;
let numEngineers;
let numInterns;

inquirer
  .prompt([
    {
      type: "input",
      message: "How many managers?",
      name: "numManagers",
    },
    {
      type: "input",
      message: "How many engineers?",
      name: "numEngineers",
    },
    {
      type: "input",
      message: "How many interns?",
      name: "numInterns",
    },
  ])
  .then((resp) => {
    numManagers = parseInt(resp.numManagers);
    numEngineers = parseInt(resp.numEngineers);
    numInterns = parseInt(resp.numInterns);
    const finalPrompt = determineSize();
    inquirer.prompt(finalPrompt).then((resp) => {
      const employees = [];
      for (let i = 0; i < numManagers; i++) {
        const managerNum = `manager${i + 1}`;
        const info = resp[managerNum].split(",");
        info.map((item) => item.trim());
        const manager = new Manager(...info);
        employees.push(manager);
      }
      for (let i = 0; i < numEngineers; i++) {
        const info = resp[`engineer${i + 1}`].split(",");
        info.map((item) => item.trim());
        const engineer = new Engineer(...info);
        employees.push(engineer);
      }
      for (let i = 0; i < numInterns; i++) {
        const info = resp[`intern${i + 1}`].split(",");
        info.map((item) => item.trim());
        const intern = new Intern(...info);
        employees.push(intern);
      }
      const html = render(employees);
      fs.writeFileSync(outputPath, html);
    });
  });

function determineSize() {
  const finalPrompt = [];
  if (numManagers) {
    finalPrompt.push({
      type: "confirm",
      message:
        "Please fill out managers information in one line with all of the following pieces of information separated by commas: 'name, personal ID, email, office number'",
      name: `managerDirections`,
    });
  }
  for (let i = 0; i < numManagers; i++) {
    finalPrompt.push({
      type: "input",
      message: `Please fill out manager #${i + 1}'s information`,
      name: `manager${i + 1}`,
    });
  }
  if (numEngineers) {
    finalPrompt.push({
      type: "confirm",
      message:
        "Please fill out engineers information in one line with all of the following pieces of information separated by commas: 'name, personal ID, email, github username'",
      name: `engineerDirections`,
    });
  }
  for (let i = 0; i < numEngineers; i++) {
    finalPrompt.push({
      type: "input",
      message: `Please fill out engineer #${i + 1}'s information`,
      name: `engineer${i + 1}`,
    });
  }
  if (numInterns) {
    finalPrompt.push({
      type: "confirm",
      message:
        "Please fill out interns information in one line with all of the following pieces of information separated by commas: 'name, personal ID, email, school'",
      name: `internDirections`,
    });
  }
  for (let i = 0; i < numInterns; i++) {
    finalPrompt.push({
      type: "input",
      message: `Please fill out intern #${i + 1}'s information`,
      name: `intern${i + 1}`,
    });
  }
  return finalPrompt;
}
