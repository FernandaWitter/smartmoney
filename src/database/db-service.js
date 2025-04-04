import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const CATEGORY_TABLE = 'categories';
const ENTRY_TABLE = 'entries'

enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase({ name: 'todo-data.db', location: 'default' }, error => { console.log(error) });
};

export const createTable = async(db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${CATEGORY_TABLE}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT,
        isDefault BOOLEAN,
        isCredit BOOLEAN,
        catOrder INTEGER
    );
    CREATE TABLE IF NOT EXISTS ${ENTRY_TABLE}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category INTEGER,
        amount REAL NOT NULL,
        description TEXT,
        insertDate TEXT,
        lat REAL,
        long REAL,
        photo BLOB,
        isInit BOOLEAN,
        FOREIGN KEY(category) REFERENCES ${CATEGORY_TABLE}(id)
    );
    INSERT OR REPLACE INTO ${CATEGORY_TABLE} (id, name, color, isDefault, isCredit, catOrder) values
    (1, "Credit", "#000", false, true, 1),
    (2, "Food", "#960200", true, false, 2),
    (3, "Gas", "#FOC808", false, false, 3),
    (4, "Rent", "#036D19", false, false, 4),
    (5, "Leisure", "#41D3BD", false, false, 5),
    (6, "Others", "#134074", false, false, 6);`;

    await db.executeSql(query);
};

export const getEntries = async(db) => {
    try {
        const entries = [];
        console.log('ENTRIES: ', entries)
        const results = await db.executeSql(`SELECT id, category, amount, description FROM ${ENTRY_TABLE}`);
        console.log('RESULTS: ', results)
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                console.log('ENTRY: ', result.rows.item(index))
                entries.push(result.rows.item(index))
            }
        });
        return entries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entries !!!');
    }
};

export const saveEntryItems = async(db, todoItems) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${ENTRY_TABLE}(id, category, amount, description) values` +
        todoItems.map(i => `(${i.id}, '${i.category}', '${i.amount}', '${i.description}')`).join(',');

    return db.executeSql(insertQuery);
};
/*
export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};*/