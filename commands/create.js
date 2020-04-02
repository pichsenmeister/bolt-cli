const inquirer = require('inquirer');
const path = require('path')
const prompts = require('../prompts');
const generator = require('../generator')

const create = async (argv) => {
    const state = await inquirer.prompt(prompts.create({}))

    state.path = process.cwd()
    state.dir = path.join(state.path, state.name)

    generator.generate(state)
}

module.exports = create