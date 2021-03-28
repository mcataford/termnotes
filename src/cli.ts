#!/usr/bin/env node

import yargs from 'yargs'

import ls from './commands/ls'
import newDocument from './commands/new'
import init from './commands/init'
import lsTags from './commands/ls-tags'

yargs
    .scriptName('notes')
    .usage('$0 <command> [options]')
    .command(init)
    .command(newDocument)
    .command(ls)
    .command(lsTags)
    .demandCommand(1)
    .check((argv) => {
        const command = String(argv._[0])
        if (!['ls-tags', 'ls', 'new', 'init'].includes(command))
            throw new Error(`${command} is not a valid command.`)

        return true
    })
    .help().argv
