import { v4 as uuidv4 } from 'uuid'
import frontmatter from '@github-docs/frontmatter'

import { Context, Document, DocumentTypes } from '../types'

export default function saveNote(
    context: Context,
    content: string,
    existingId?: string,
): Document {
    const newDocument = {
        uid: existingId || uuidv4(),
        data: content,
        type: 'note' as DocumentTypes,
    }

    const { data: meta } = frontmatter(newDocument.data)
    // TODO: Reunified queries?
    if (existingId) {
        context.database.run(
            `UPDATE documents SET data="${newDocument.data}", updated=CURRENT_TIMESTAMP WHERE uid="${newDocument.uid}";`,
        )
        context.database.run(
            `UPDATE meta SET title="${meta.title}" WHERE document="${newDocument.uid}";`,
        )
        //TODO: Add tag updates.
    } else {
        context.database.run(
            `INSERT INTO documents (uid, data, type, updated) VALUES ("${newDocument.uid}", "${newDocument.data}", "${newDocument.type}", CURRENT_TIMESTAMP);`,
        )
        context.database.run(
            `INSERT INTO meta (document, title) VALUES ("${newDocument.uid}", "${meta.title}");`,
        )

        for (const tag of meta.tags ?? []) {
            context.database.run(
                `INSERT INTO tags (document, tag) VALUES ("${newDocument.uid}", "${tag}");`,
            )
        }
    }
    return newDocument
}
