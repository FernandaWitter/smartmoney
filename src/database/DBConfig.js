import {enablePromise, openDatabase} from "react-native-sqlite-storage"

const DATABASE_NAME = 'smartMoney.db';
const CATEGORY_TABLE = 'categories';
const ENTRY_TABLE = 'entries'

enablePromise(true)

export const connectToDatabase = async() => {
    return openDatabase({ name: DATABASE_NAME, location: "default" },
        () => { console.log('Connected to DB') },
        (error) => {
            console.error(error)
            throw Error("Could not connect to database")
        }
    )
}

export const createTables = async(db) => {
    const catQuery = `CREATE TABLE IF NOT EXISTS ${CATEGORY_TABLE}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT,
    isDefault BOOLEAN,
    isCredit BOOLEAN,
    catOrder INTEGER
);`

    const entriesQuery = `CREATE TABLE IF NOT EXISTS ${ENTRY_TABLE}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category INTEGER,
    amount REAL NOT NULL,
    description TEXT,
    insertDate TEXT,
    lat REAL,
    long REAL,
    photo BLOB,
    isInit BOOLEAN,
    FOREIGN KEY(category) REFERENCES ${CATEGORY_TABLE}(id));`

    const insertCatQuery = `INSERT OR REPLACE INTO ${CATEGORY_TABLE} (id, name, color, isDefault, isCredit, catOrder) VALUES
    (1, "Credit", "#000", false, true, 1),
    (2, "Food", "#960200", true, false, 2),
    (3, "Gas", "#FOC808", false, false, 3),
    (4, "Rent", "#036D19", false, false, 4),
    (5, "Leisure", "#41D3BD", false, false, 5),
    (6, "Others", "#134074", false, false, 6);`

    const insertEntryQuery = `INSERT OR REPLACE INTO ${ENTRY_TABLE} (id, category, amount, description) VALUES
        (1, 2, 10, "The Good Bakery"),
        (2, 2, 190, "Aldi"),
        (3, 3, 290, "One Gas Stop");`

    try {
        await db.executeSql(catQuery)
        await db.executeSql(entriesQuery)
        await db.executeSql(insertCatQuery)
        await db.executeSql(insertEntryQuery)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}