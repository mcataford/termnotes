import initializeDatabase from '../core/initializeDatabase'

const init = {
    command: 'init',
    describe: 'Initializes the database',
    handler: async (): Promise<void> => {
        await initializeDatabase()
    },
}

export default init
