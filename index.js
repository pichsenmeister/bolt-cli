#!/usr/bin/env node

const { program } = require('commander');

const commands = require('./commands')


const getDefaultOptions = async (argv) => {
  const options = [
    {
      short: '-n',
      long: '--name',
      description: 'Project name',
      argument: 'name'
    },
    {
      short: '-a',
      long: '--apis',
      description: 'List of APIs (comma separated)',
      argument: 'apis',
      commaList: true
    },
    {
      short: '-c',
      long: '--components',
      description: 'List of components (comma separated)',
      argument: 'components',
      commaList: true
    },
    {
      short: '-l',
      long: '--language',
      description: 'Programming language (Javascript, Typescript, Java)',
      argument: 'language'
    },
    {
      short: '-d',
      long: '--dependencies',
      description: 'List of dependencies to be installed (comma separated)',
      argument: 'dependencies',
      commaList: true
    },
    {
      short: '-t',
      long: '--token',
      description: 'Slack app token',
      argument: 'token'
    },
    {
      short: '-s',
      long: '--signing-secret',
      description: 'Slack app Signing Secret',
      argument: 'signing_secret'
    }
  ]

  program
    .version('1.0.0')

  options.forEach(option => {
    const optionStr = option.argument ? `${option.short}, ${option.long} <${option.argument}>` : `${option.short}, ${option.long}`
    program.option(optionStr, option.description)
  })

  await program.parse(argv)

  const defaults = {}
  options.forEach(option => {
    if(program[option.argument]) {
      defaults[option.argument] = option.commaList ? program[option.argument].split(',') : program[option.argument]
    }
  })

  return defaults
}

const start = async (argv) => {  

    let output = '';
      output += ' ____   ____  _   _______ \n';
      output += '|  _ \\ / __ \\| | |__   __|\n';
      output += '| |_) | |  | | |    | |   \n';
      output += '|  _ <| |  | | |    | |   \n';
      output += '| |_) | |__| | |____| |   \n';
      output += '|____/ \\____/|______|_|   \n';
    console.log(output);

    const defaults = await getDefaultOptions(argv)

    const command = argv.length <= 2 ? 'help' : argv[2]

    if(!defaults.help) {
      switch (command) {
        case 'create':
          commands.create(defaults)
          break;
        case 'help':
          console.log('Usage: bolt-cli create\n')
          console.log('Use bolt-cli -h or bolt-cli --help for additional options\n')
          break;  
        default:
          commands.create(defaults)
          break

      }
    }
}

start(process.argv)
 