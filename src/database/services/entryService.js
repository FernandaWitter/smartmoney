import moment from 'moment';
import 'moment/locale/br';
moment.locale('pt-br');

const CATEGORY_TABLE = 'categories';
const ENTRY_TABLE = 'entries';

export const getCurrentBalance = async (db, days) => {
    let query = `SELECT sum(amount) AS balance FROM entries`;
    if (days){
        const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
        query = query + ` WHERE  strftime('%s', date) <  strftime('%s', '${date}')`;
    }
    const entriesTotal = await db.executeSql(query);

    let balance = 0;
    entriesTotal?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
            balance = parseFloat(result.rows.item(index).balance);
        }
    });
    return balance.toFixed(2);
}

export const getCategories = async(db) => {
    try {
        const recoveredCategories = await db.executeSql(
            `SELECT id, name, color FROM ${CATEGORY_TABLE}`
        );
        const shownCategories = [];
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownCategories[index] = {
                    "id":result.rows.item(index).id,
                    "description": result.rows.item(index).name,
                    "color": result.rows.item(index).color,
                };
            }
        });
        return shownCategories;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get categories.');
    }
};

export const getCategorySummary = async(db, days, category) => {
    const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
    try {
        let query = `SELECT ${CATEGORY_TABLE}.name as description, SUM(amount) as amount, color
            FROM ${ENTRY_TABLE} 
            JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id 
            WHERE category != 1`;
        if(days > 0){
            query = query + ` AND date >= '${date}'`;
        }
        if(category > 0){
            query = query + ` AND category = ${category}`;
        }
        query = query + ' GROUP BY category ORDER BY amount';
        const recoveredCategories = await db.executeSql(query);
        const shownCategories = [];
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownCategories[index] = {
                    "description": result.rows.item(index).description,
                    "amount": Math.abs(result.rows.item(index).amount),
                    "color": result.rows.item(index).color
                };
            }
        });
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
        );
        let category = {};
        recoveredCategories?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                category = {
                    "id":result.rows.item(index).id,
                    "description": result.rows.item(index).name,
                    "color": result.rows.item(index).color,
                };
            }
        });
        return category;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get category by ID.');
    }
}

export const getEntries = async(db, days, category, limit) => {
    const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
    try {
        let query = `SELECT ${ENTRY_TABLE}.id, category, amount, description, color, date, address FROM ${ENTRY_TABLE} 
                JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id 
                WHERE 1=1`;
        if (days > 0){
            query = query + ` AND strftime('%s', date) >= strftime('%s', '${date}')`;
        }
        if (category > 0) {
            query = query + ` AND category = ${category} `;
        }
        query = query + ` ORDER BY date DESC`;
        if (limit > 0){
            query = query + ` LIMIT ${limit} `;
        }

        let recoveredEntries = await db.executeSql(query);
        const shownEntries = [];
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "id": result.rows.item(index).id,
                    "category": result.rows.item(index).category,
                    "amount": Math.abs(result.rows.item(index).amount),
                    "description": result.rows.item(index).description,
                    "color": result.rows.item(index).color,
                    "date": result.rows.item(index).date,
                    "address": result.rows.item(index).address
                };
            }
        });
        return shownEntries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entries.');
    }
};

export const getEntriesForTimePeriod = async(db, days) => {
    const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
    try {
        let query = `SELECT amount, date FROM entries WHERE 1=1 AND strftime('%s', date) >= strftime('%s', '${date}') ORDER BY date DESC`;
        let recoveredEntries = await db.executeSql(query);
        
        const shownEntries = []
        recoveredEntries?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                shownEntries[index] = {
                    "amount": result.rows.item(index).amount,
                    "date": result.rows.item(index).date,
                };
            }
        });
        return shownEntries;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entries.');
    }
};

export const getEntryByID = async (db, id) => {
    try {
        const query =`SELECT amount, category, description, date, ${CATEGORY_TABLE}.name as categoryText, address, photo
            FROM ${ENTRY_TABLE} JOIN ${CATEGORY_TABLE} ON ${ENTRY_TABLE}.category = ${CATEGORY_TABLE}.id
            WHERE ${ENTRY_TABLE}.id = ${id}`;
        const recoveredEntry = await db.executeSql(query);
        let entry = {};
        recoveredEntry?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                entry = {
                    "id": id,
                    "category": result.rows.item(index).category,
                    "amount": Math.abs(result.rows.item(index).amount),
                    "description": result.rows.item(index).description,
                    "date": result.rows.item(index).date,
                    "categoryText": result.rows.item(index).categoryText,
                    "address": result.rows.item(index).address,
                    "photo": result.rows.item(index).photo
                };
            }
            return entry;
        })
        return entry;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get entry by ID.');
    }
};

export const saveEntryItem = async(db, entry) => {
    const insertQuery =
        `INSERT INTO ${ENTRY_TABLE}(category, amount, description, date, address, photo) VALUES
        (${entry.category}, ${entry.amount}, '${entry.description}', '${entry.date}', '${entry.address}', '${entry.photo}')`;
    return db.executeSql(insertQuery, error => { console.error(error) });
};

export const updateEntryItem = async (db, entry) => {
    const updateQuery =
        `UPDATE ${ENTRY_TABLE} SET 
            category = ${entry.category},
            amount = ${entry.amount},
            description = '${entry.description}',
            date = '${entry.date}',
            address = '${entry.address}',
            photo = '${entry.photo}'
        WHERE id = ${entry.id}`;
    return db.executeSql(updateQuery, error => {console.error(error)});
};

export const deleteEntryItem = async (db, id) => {
    const deleteQuery = `DELETE FROM ${ENTRY_TABLE} WHERE id = ${id}`;
    return db.executeSql(deleteQuery, error => {console.error(error)});
};
