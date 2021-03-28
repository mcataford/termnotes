import { Context } from '../types'

type Tag = string

export default async function listTags(context: Context): Promise<Tag[]> {
    const records: Tag[] = await new Promise((resolve, reject) => {
        const records: Tag[] = []
        context.database.each(
            'SELECT distinct(tag) FROM tags;',
            (err, row) => {
                records.push(row.tag)
            },
            (err) => {
                if (err) reject(err)
                resolve(records)
            },
        )
    })
    return records
}
