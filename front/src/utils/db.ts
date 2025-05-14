import { openDB } from 'idb'

const DB_NAME = 'invoiceApp'
const DB_VERSION = 5;
export const getDb = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("personal")) {
        db.createObjectStore("personal", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("invoice")) {
        db.createObjectStore("invoice", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("payment")) {
        db.createObjectStore("payment", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("emailConfig")) {
        db.createObjectStore("emailConfig", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("apiConfig")) {
        db.createObjectStore("apiConfig", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("additionals")) {
        db.createObjectStore("additionals", { keyPath: "id" });
      }
    },
  });
};

export const fetchData = async (store: string, id: number) => {
  const db = await getDb();
  return await db.get(store, id);
};

export const fetchAllData = async (store: string) => {
  const db = await getDb();
  return await db.getAll(store);
};

export const deleteData = async (store: string, id: number) => {
  const db = await getDb();
  await db.delete(store, id);
};

export const updateData = async (store: string, data: any) => {
  const db = await getDb();
  await db.put(store, data);
};