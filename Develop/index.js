// packages required for the code to run
const fs = require('fs');
const inquirer = require('inquirer');

// function to generate the license badges
function renderLicenseBadge(license) {
  const licenseBadges = {
    'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'GNU GPLv3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
  };

  return licenseBadges[license] || '';
}
// README skeleton with template literals with table of contents that takes you to each section by clicking 

function generateREADME(answers) {
  return `
# ${answers.title}

${renderLicenseBadge(answers.license)}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This application is covered under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For any questions, you can contact me via:
- Email: ${answers.email}
- GitHub: [${answers.username}](https://github.com/${answers.username})
`;
}


function writeToFile(file, data) {
  fs.writeFile(file, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README file has been generated successfully!');
    }
  });
}

// questions for the user to create their readme
function init() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of your project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a brief description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter the installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter the usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your application:',
      choices: ['MIT', 'Apache 2.0', 'GNU GPLv3'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter the contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter the test instructions:',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
    // uses the answers to create a readme file using the skeleton above as a baseline
  ]).then((answers) => {
    const readmeContent = generateREADME(answers);

    const fileName = 'README.md';

    writeToFile(fileName, readmeContent);
  });
}

init();
