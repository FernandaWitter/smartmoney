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
            "SELECT id, category, amount, description FROM entries ORDER BY insertDate DESC"
        )
        const shownEntries = []
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "id": result.rows.item(index).id,
                    "category": result.rows.item(index).category,
                    "amount": result.rows.item(index).amount,
                    "description": result.rows.item(index).description
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
            `SELECT ${ENTRY_TABLE}.id, category, amount, description, color, updateDate FROM ${ENTRY_TABLE} 
                JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id
                ORDER BY insertDate DESC LIMIT 5`
        )
        const shownEntries = []
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "id": result.rows.item(index).id,
                    "category": result.rows.item(index).category,
                    "amount": result.rows.item(index).amount,
                    "description": result.rows.item(index).description,
                    "color": result.rows.item(index).color,
                    "updateDate": result.rows.item(index).updateDate,
                }
            }
        })
        console.log(shownEntries)
        return shownEntries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get latest entries.');
    }
};

export const getEntryByID = async (db, id) => {
    try {
        const recoveredEntry = await db.executeSql(
            `SELECT amount, category, description FROM ${ENTRY_TABLE} WHERE id = ${id}`
        )
        let entry = {}
        recoveredEntry?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                entry = {
                    "id": id,
                    "category": result.rows.item(index).category,
                    "amount": result.rows.item(index).amount,
                    "description": result.rows.item(index).description
                }
            }
        })
        return entry;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entry by ID.');
    }
}

export const saveEntryItem = async(db, entry) => {
    const currDate = new Date()
    const insertQuery =
        `INSERT INTO ${ENTRY_TABLE}(category, amount, description, insertDate, updateDate) VALUES
        (${entry.category}, ${entry.amount}, '${entry.description}', '${currDate}', '${currDate}');`;

    return db.executeSql(insertQuery, error => { console.log(error) });
};

export const updateEntryItem = async (db, entry) => {
    const currDate = new Date()
    console.log(entry)
    const updateQuery =
        `UPDATE ${ENTRY_TABLE} SET 
            category = ${entry.category},
            amount = ${entry.amount},
            description = '${entry.description}',
            updateDate = ${currDate}
        WHERE id = ${entry.id}`
    return db.executeSql(updateQuery, error => {console.log(error)}
    )
}

export const deleteEntry = async (db, id) => {
    console.log("DELETE ID")
    console.log(id)
    const deleteQuery = `DELETE FROM ${ENTRY_TABLE} WHERE id = ${id}`;
    console.log(deleteQuery)
    return db.executeSql(deleteQuery, error => {console.log(error)});
};
