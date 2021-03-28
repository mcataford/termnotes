import { Context, DocumentListItem } from '../types'

export default async function listNotes(
    context: Context,
    tag?: string,
): Promise<DocumentListItem[]> {
    const records: DocumentListItem[] = await new Promise((resolve, reject) => {
        const records: DocumentListItem[] = []

        const query = tag
            ? `SELECT uid, title, updated FROM documents JOIN meta ON documents.uid = meta.document JOIN tags ON documents.uid = tags.document WHERE type = "note" AND tags.tag = "${tag}";`
            : 'SELECT uid, title, updated FROM documents JOIN meta ON documents.uid = meta.document WHERE type = "note";'
        context.database.each(
            query,
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
