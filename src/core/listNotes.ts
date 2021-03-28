import { Context, DocumentListItem } from '../types'

export default async function listNotes(
    context: Context,
): Promise<DocumentListItem[]> {
    const records: DocumentListItem[] = await new Promise((resolve, reject) => {
        const records: DocumentListItem[] = []
        context.database.each(
            'SELECT uid, title, updated FROM documents JOIN meta ON documents.uid = meta.document WHERE type = "note";',
            (err, row) => {
                records.push(row as DocumentListItem)
            },
            (err) => {
                if (err) reject(err)
                resolve(records)
            },
        )
    })
    return records
}
