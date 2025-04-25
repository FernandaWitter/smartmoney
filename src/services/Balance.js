import _ from 'lodash';
import moment from 'moment';

import { connectToDatabase } from "../database/DBConfig";
import { getCurrentBalance, getEntriesForTimePeriod } from "../database/services/entryService";

export const getBalance = async() => {
    try {
        const db = await connectToDatabase();
        const balance = await getCurrentBalance(db);
        return balance;
    } catch (error) {
        console.error(error);
    }
};

export const getBalanceSummary = async(days) => {
    try {
        const db = await connectToDatabase();
        let balanceUntilDate = parseFloat(await getCurrentBalance(db, days));
        let entriesUntilDate = await getEntriesForTimePeriod(db, days);
        entriesUntilDate = _(entriesUntilDate).groupBy(entry => moment(entry.date).format('YYYYMMDD'))
            .map(entry => _.sumBy(entry, 'amount'))
            .map((amount, index, collection) => {
                balanceUntilDate = isNaN(balanceUntilDate) ? 0 : balanceUntilDate;
                return (parseFloat(balanceUntilDate + _.sum(_.slice(collection, 0, index + 1))))
            });
        return entriesUntilDate;
    } catch (error) {
        console.error(error);
    }
};