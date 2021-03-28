import { Context } from '../types'
import getDatabase from '../utils/getDatabase'

export default async function getContext(): Promise<Context> {
    return {
        database: await getDatabase(),
    }
}
