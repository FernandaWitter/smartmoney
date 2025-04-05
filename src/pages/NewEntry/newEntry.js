import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';

import { connectToDatabase } from '../../database/DBConfig';
import { getBalance } from '../../database/services/entryService';

const NewEntry = () => {
    const [balance, setBalance] = useState()

    const loadData = useCallback(async() => {
        try {
            const db = await connectToDatabase()

            const balance = await getBalance(db)
            if (balance != null && balance != undefined) { setBalance(balance) }

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])


    return ( <
        View style = { styles.container } >
        <
        BalanceLabel currBalance = { balance }
        /> <
        NewEntryForm / >
        <
        /View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default NewEntry;