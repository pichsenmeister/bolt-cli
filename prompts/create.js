const fs = require('fs')
const path = require('path')

const create = (defaults) => {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Please enter an app name:',
      validate: (text) => {
        if (!text.match(/^[A-Za-z0-9\-_]+$/)) {
          return 'Please use only alphanumeric characters, - or _';
        }

        const currentPath = process.cwd()
        const dir = path.join(currentPath, text)

        if (fs.existsSync(dir)) {
          return `${dir} already exists. Please choose a different name.`
        }
  
        return true;
      },
      default: defaults.name
    },
    // features
    {
      "type": "checkbox",
      "message": "Select APIs",
      "name": "apis",
      "choices": [
        {
          "name": "Events API",
          "value": "events_api"
        },
        {
          "name": "Interactivity & Shortcuts",
          "value": "interactivity"
        }
      ],
      default: defaults.apis
    },
    //components
    {
      "type": "checkbox",
      "message": "Select components",
      "name": "components",
      "choices": [
        {
          "name": "App home tab",
          "value": "app_home"
        },
        {
          "name": "App DM",
          "value": "app_dm"
        },
        {
          "name": "Block Kit modals",
          "value": "modals"
        },
        {
          "name": "Shortcuts",
          "value": "shortcuts"
        },
        {
          "name": "Slash commands",
          "value": "slash_commands"
        },
        {
          "name": "External select menus",
          "value": "external_select"
        }
      ],
      default: defaults.components
    },
    // language
    {
      "type": "list",
      "message": "What's your programming language?",
      "name": "language",
      "choices": [
        {
          "name": "Javascript",
          "value": "javascript"
        },
        // {
        //   "name": "Typescript",
        //   "value": "typescript"
        // }
      ],
      default: defaults.language
    },
    // dependencies
    {
      "type": "checkbox",
      "message": "Do you want to add npm dependencies?",
      "name": "dependencies",
      "choices": [
        {
          "name": "dotenv",
          "value": "dotenv",
          checked: true
        },
        {
          "name": "axios",
          "value": "axios"
        }
      ],
      default: defaults.dependencies,
      when: (answers) => {
        return answers.language === 'typescript' || answers.language === 'javascript';
      }
    },
    {
      "type": "input",
      "message": "Add your token (leave empty to skip):",
      "name": "token",
      default: defaults.token
    },
    {
      "type": "input",
      "message": "Add your Signing Secret (leave empty to skip):",
      "name": "signing_secret",
      default: defaults.signing_secret
    }
  ];
}

module.exports = create
