'use strict';
// const { program } = require('commander');

const commands = require('./commands')

const start = async (argv) => {  
  const command = argv.length <= 2 ? 'help' : argv[2]

    let output = '';
      output += ' ____   ____  _   _______ \n';
      output += '|  _ \\ / __ \\| | |__   __|\n';
      output += '| |_) | |  | | |    | |   \n';
      output += '|  _ <| |  | | |    | |   \n';
      output += '| |_) | |__| | |____| |   \n';
      output += '|____/ \\____/|______|_|   \n';
    console.log(output);

    switch (command) {
      case 'create':
        commands.create(argv.slice(2))
        break;
      default:
        console.log('help')  
    }
}

start(process.argv)
 