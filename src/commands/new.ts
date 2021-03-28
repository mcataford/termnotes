import getContext from '../core/getContext'
import openWithEnvEditor from '../core/openWithEnvEditor'
import saveNote from '../core/saveNote'

const newDocument = {
    command: 'new',
    describe: 'Creates a new document',
    handler: async (): Promise<void> => {
        const context = await getContext()
        const content = await openWithEnvEditor()

        if (content) {
            saveNote(context, content)
        }
    },
}

export default newDocument
