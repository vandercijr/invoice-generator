import { openDB } from 'idb'

const DB_NAME = 'invoiceApp'
const DB_VERSION  = 3
export const getDb = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('personal')) {
                db.createObjectStore('personal', { keyPath: 'id' })
            }
            if (!db.objectStoreNames.contains('invoice')) {
                db.createObjectStore('invoice', { keyPath: 'id' })
            }
            if (!db.objectStoreNames.contains('payment')) {
                db.createObjectStore('payment', { keyPath: 'id' })
            }
            if (!db.objectStoreNames.contains('apiConfig')) {
                db.createObjectStore('apiConfig', { keyPath: 'id' })
            }
        }
    })
}

export const fetchData = async (store: string, id: number) => {
    const db = await getDb()
    return await db.get(store, id)
}
