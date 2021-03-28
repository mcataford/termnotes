import sqlite3 from 'sqlite3'

export interface Context {
    database: sqlite3.Database
}

export type DocumentTypes = 'note'

export interface Document {
    uid: string
    type: DocumentTypes
    data: string
    updated?: string
}

export interface DocumentListItem {
    uid: string
    updated: string
    title: string
}
