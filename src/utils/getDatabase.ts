import os from 'os'
import path from 'path'
import { promises as fs } from 'fs'

import sqlite3 from 'sqlite3'

const ROOT_DIR = path.resolve(os.homedir(), '.notes')
const DBPATH = `${ROOT_DIR}/notes.sqlite`

const NO_DATABASE = 'No database found'

export default async function getDatabase(): Promise<sqlite3.Database> {
    try {
        await fs.mkdir(ROOT_DIR, { recursive: true })
        return new sqlite3.Database(DBPATH)
    } catch (e) {
        /* Database does not exist yet */
        throw new Error(NO_DATABASE)
    }
}
