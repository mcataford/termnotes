#!/usr/bin/env node

import yargs from 'yargs'

import ls from './commands/ls'
import newDocument from './commands/new'
import init from './commands/init'

yargs
    .scriptName('notes')
    .usage('$0 <command> [options]')
    .command([init, newDocument, ls])
    .demandCommand(1)
    .check((argv) => {
        const command = argv._[0]
        if (!['ls', 'new', 'init'].includes(command))
            throw new Error(`${command} is not a valid command.`)

        return true
    })
    .help().argv
