import { enablePromise, openDatabase } from "react-native-sqlite-storage"
import Colors from "../styles/colors";

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
    updateDate TEXT,
    lat REAL,
    long REAL,
    photo BLOB,
    isInit BOOLEAN,
    FOREIGN KEY(category) REFERENCES ${CATEGORY_TABLE}(id));`

    const insertCatQuery = `INSERT OR REPLACE INTO ${CATEGORY_TABLE} (id, name, color, isDefault, isCredit, catOrder) VALUES
    (1, "Credit", '${Colors.black}', false, true, 1),
    (2, "Food", '${Colors.red}', true, false, 2),
    (3, "Gas", '${Colors.yellow}', false, false, 3),
    (4, "Rent", '${Colors.violet}', false, false, 4),
    (5, "Leisure", '${Colors.turquoise}', false, false, 5),
    (6, "Others", '${Colors.blue}', false, false, 6);`

    try {
        await db.executeSql(catQuery, error => { console.log(error) })
        await db.executeSql(entriesQuery, error => { console.log(error) })
        await db.executeSql(insertCatQuery, error => { console.log(error) })
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

export const clearDatabase = async(db) => {
    try {
        await db.executeSql(`DROP TABLE IF EXISTS ${ENTRY_TABLE}`)
        await db.executeSql(`DROP TABLE IF EXISTS ${CATEGORY_TABLE}`)
    } catch {
        console.error(error)
        throw Error(`Failed to drop tables`)
    }
}