const CATEGORY_TABLE = 'categories';
const ENTRY_TABLE = 'entries'


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
        throw Error('Failed to get categories.');
    }
};

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
        throw Error('Failed to get entries.');
    }
};

export const getLatestEntries = async(db) => {
    try {
        const recoveredEntries = await db.executeSql(
            "SELECT description, amount FROM entries ORDER BY updateDate DESC LIMIT 5"
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
        throw Error('Failed to get latest entries.');
    }
};

export const saveEntryItem = async(db, entry) => {
    console.log("Entered save function")
    console.log(entry)
    const currDate = new Date().getTime()
    const insertQuery =
        `INSERT INTO ${ENTRY_TABLE}(category, amount, description, insertDate, updateDate) VALUES
        (${entry.category}, ${entry.amount}, '${entry.description}', '${currDate}', '${currDate}');`;

    return db.executeSql(insertQuery, 
        () => { console.log('Data added to DB')},
        error => { console.log(error) });
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

