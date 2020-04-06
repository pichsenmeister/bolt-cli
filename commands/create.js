const inquirer = require('inquirer');
const path = require('path')
const prompts = require('../prompts');
const generator = require('../generator')

const create = async (defaults) => {
    const state = await inquirer.prompt(prompts.create(defaults))

    state.path = process.cwd()
    state.dir = path.join(state.path, state.name)

    generator.generate(state)
}

module.exports = create