import { Context, Document } from '../types'

export default async function loadNote(
    context: Context,
    uid: string,
): Promise<Document> {
    const record: Document = await new Promise((resolve, reject) => {
        context.database.get(
            `SELECT * FROM documents WHERE uid = "${uid}";`,
            async (err, row) => {
                if (err) reject(err)
                resolve(row)
            },
        )
    })
    return record
}
