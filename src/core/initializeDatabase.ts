import { promises as fs } from 'fs'
import path from 'path'

import { Database } from 'sqlite3'

import getDatabase from '../utils/getDatabase'

interface Migration {
    name: string
    sql: string
}

export default async function initializeDatabase(): Promise<void> {
    const database = await getDatabase()

    await runMigrations(database)

    database.close()
}

interface MigrationOutcome {
    error?: Error
}

async function runMigrations(database: Database) {
    const migrations = await getMigrations()

    for (const migration of migrations) {
        const outcome: MigrationOutcome = await new Promise((resolve) =>
            database.run(migration.sql, (e) => {
                e ? resolve({ error: e }) : resolve({})
            }),
        )
        if (outcome?.error)
            console.error(`Failed to run ${migration.name}: ${outcome.error}`)
        else console.log(`Ran ${migration.name}`)
    }
}

async function getMigrations(): Promise<Migration[]> {
    const migrationsDir = path.resolve(__dirname, '../../migrations')
    const migrationFiles = await fs.readdir(migrationsDir)
    const migrations = []
    for (const migrationFile of migrationFiles) {
        const sql = await fs.readFile(`${migrationsDir}/${migrationFile}`, {
            encoding: 'utf8',
        })

        migrations.push({ name: migrationFile, sql })
    }

    return migrations
}
