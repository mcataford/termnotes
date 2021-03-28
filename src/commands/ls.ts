import inquirer from 'inquirer'
import inquirerSearchList from 'inquirer-search-list'

import getContext from '../core/getContext'
import openWithEnvEditor from '../core/openWithEnvEditor'
import saveNote from '../core/saveNote'
import loadNote from '../core/loadNote'
import listNotes from '../core/listNotes'

inquirer.registerPrompt('search-list', inquirerSearchList)

const ls = {
    command: 'ls',
    describe: 'Lists all notes',
    handler: async (): Promise<void> => {
        const context = await getContext()

        const currentNotes = await listNotes(context)
        const choice = await inquirer.prompt([
            {
                name: 'open',
                type: 'search-list',
                message: 'Open a note',
                pageSize: 20,
                choices: currentNotes.map((n) => ({
                    name: `(${n.updated}) ${n.title}`,
                    value: n.uid,
                })),
            },
        ])
        const currentContent = await loadNote(context, choice.open)
        const content = await openWithEnvEditor(currentContent.data)

        if (content) {
            saveNote(context, content, currentContent.uid)
        }
    },
}

export default ls
