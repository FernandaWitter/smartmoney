import moment from 'moment'
import 'moment/locale/br'
moment.locale('pt-br')

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
    return balance.toFixed(2);
}

export const getCategories = async(db) => {
    try {
        const recoveredCategories = await db.executeSql(
            `SELECT id, name, color FROM ${CATEGORY_TABLE}`
        )
        const shownCategories = []
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownCategories[index] = {
                    "id":result.rows.item(index).id,
                    "description": result.rows.item(index).name,
                    "color": result.rows.item(index).color,
                }
            }
        })
        return shownCategories;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get categories.');
    }
};

export const getCategorySummary = async(db) => {
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

export const getCategoryById = async (db, id) => {
    try {
        const recoveredCategories = await db.executeSql(
            `SELECT id, name, color FROM ${CATEGORY_TABLE} WHERE id=${id}`
        )
        let category = {}
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                category = {
                    "id":result.rows.item(index).id,
                    "description": result.rows.item(index).name,
                    "color": result.rows.item(index).color,
                }
            }
        })
        return category;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get category by ID.');
    }
}

export const getEntries = async(db, days, category) => {
    const date = moment().subtract(days, 'days').format('YYYY-MM-DD')
    console.log('cat: ', category)
    console.log('filter day: ', date)

    try {
        let query = `SELECT ${ENTRY_TABLE}.id, category, amount, description, color, date FROM ${ENTRY_TABLE} 
                JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id 
                WHERE strftime('%s', date) >=  strftime('%s', '${date}')`
        if (category > 0) {
            query = query + ` AND category = ${category} `
        }
        query = query + ` ORDER BY date DESC`
        console.log('query')
        console.log(query)

        let recoveredEntries = await db.executeSql(query)
        console.log('recoveredEntries')
        console.log(recoveredEntries)
        const shownEntries = []
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "id": result.rows.item(index).id,
                    "category": result.rows.item(index).category,
                    "amount": result.rows.item(index).amount,
                    "description": result.rows.item(index).description,
                    "color": result.rows.item(index).color,
                    "date": result.rows.item(index).date,
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
            `SELECT ${ENTRY_TABLE}.id, category, amount, description, color, date FROM ${ENTRY_TABLE} 
                JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id
                ORDER BY date DESC LIMIT 5`
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
                    "date": result.rows.item(index).date,
                }
            }
        })
        return shownEntries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get latest entries.');
    }
};

export const getEntryByID = async (db, id) => {
    try {
        const recoveredEntry = await db.executeSql(
            `SELECT amount, category, description, date FROM ${ENTRY_TABLE} WHERE id = ${id}`
        )
        let entry = {}
        recoveredEntry?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                entry = {
                    "id": id,
                    "category": result.rows.item(index).category,
                    "amount": result.rows.item(index).amount,
                    "description": result.rows.item(index).description,
                    "date": result.rows.item(index).date
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
    const insertQuery =
        `INSERT INTO ${ENTRY_TABLE}(category, amount, description, date) VALUES
        (${entry.category}, ${entry.amount}, '${entry.description}', '${entry.date}');`;

    console.log(insertQuery)
        return db.executeSql(insertQuery, error => { console.log(error) });
};

export const updateEntryItem = async (db, entry) => {
    console.log(entry)
    const updateQuery =
        `UPDATE ${ENTRY_TABLE} SET 
            category = ${entry.category},
            amount = ${entry.amount},
            description = '${entry.description}',
            date = '${entry.date}'
        WHERE id = ${entry.id}`
    return db.executeSql(updateQuery, error => {console.log(error)}
    )
}

export const deleteEntry = async (db, id) => {
    const deleteQuery = `DELETE FROM ${ENTRY_TABLE} WHERE id = ${id}`;
    return db.executeSql(deleteQuery, error => {console.log(error)});
};
