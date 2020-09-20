const Engineer = require("./src/job-types/engineer.js");
const Intern = require("./src/job-types/intern.js");
const Manager = require("./src/job-types/manager.js");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "Say something",
      name: "something",
    },
  ])
  .then((resp) => {
    console.log(resp);
  });
