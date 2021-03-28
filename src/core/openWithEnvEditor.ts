import { promises as fs } from 'fs'
import { spawn } from 'child_process'
import { tmpdir } from 'os'

import frontmatter from '@github-docs/frontmatter'

const newDocumentTemplate = frontmatter.stringify('', { title: 'New note' })

export default async function openWithEnvEditor(
    content?: string,
): Promise<string> {
    const bufferDir = await fs.mkdtemp(`${tmpdir()}/`)
    const bufferPath = `${bufferDir}/note.md`
    const envEditor = process.env.EDITOR || 'vi'

    // Seed the buffer
    await fs.writeFile(bufferPath, content || newDocumentTemplate, {
        encoding: 'utf8',
    })

    const bufferContent: string = await new Promise((resolve, reject) => {
        const editorProcess = spawn(envEditor, [bufferPath], {
            stdio: 'inherit',
        })

        editorProcess.on('close', async (e) => {
            if (e) {
                reject(e)
            }

            resolve(await fs.readFile(bufferPath, { encoding: 'utf8' }))
        })

        // TODO: on 'exit'
    })

    return bufferContent
}
