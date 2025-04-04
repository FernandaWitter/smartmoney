import {enablePromise, openDatabase} from "react-native-sqlite-storage"

const DATABASE_NAME = 'smartMoney.db';
const CATEGORY_TABLE = 'categories';
const ENTRY_TABLE = 'entries'

// Enable promise for SQLite
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

export const getBalance = async (db) => {
    const entriesTotal = await db.executeSql(
        `SELECT sum(CASE WHEN category = 1 THEN amount ELSE 0 END) as credit, sum(CASE WHEN category !=1 then amount else 0 END) as debit FROM entries` 
    )

    let balance = 0
        entriesTotal?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                balance = result.rows.item(index).credit - result.rows.item(index).debit
                }
        })
    return balance;
}

export const getEntries = async(db) => {
    try {
        const recoveredEntries = await db.executeSql(
            "SELECT description, amount FROM entries"
        )
        const shownEntries = []
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "description": result.rows.item(index).description,
                    "amount": result.rows.item(index).amount
                }
            }
        })
        return shownEntries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entries !!!');
    }
};

export const getCategories = async(db) => {
    try {
        const recoveredCategories = await db.executeSql(
            `SELECT ${CATEGORY_TABLE}.name as description, SUM(amount) as amount, color
            FROM ${ENTRY_TABLE} 
            JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id 
            GROUP BY category`
        )
        const shownCategories = []
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownCategories[index] = {
                    "description": result.rows.item(index).description,
                    "amount": result.rows.item(index).amount,
                    "color": result.rows.item(index).color
                }
            }
        })
        return shownCategories;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get categories !!!');
    }
};

/*
export const saveEntryItems = async(db, entry) => {
    const insertQuery =
        `INSERT INTO ${ENTRY_TABLE}(category, amount, description) VALUES
        (${entry.category}, ${entry.amount}, '${entry.description}');`;

    return db.executeSql(insertQuery, () => console.log('Table created successfully'),
        error => { console.log(error) });
};

      
      export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
        const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
        await db.executeSql(deleteQuery);
      };

      export const deleteTable = async (db: SQLiteDatabase) => {
        const query = `drop table ${tableName}`;

        await db.executeSql(query);
      };*/

