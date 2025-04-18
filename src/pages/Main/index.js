import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { clearDatabase, connectToDatabase, createTables } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../../styles/colors';
import useEntries from '../../hooks/useEntries';
import useCategorySumByDate from '../../hooks/useCategotySumByDate';

const Main = () => {    
    const [entries] = useEntries(7,'',5)
    const [categorySummary] = useCategorySumByDate(7)

    const loadData = useCallback(async () => {

    try {
        const db = await connectToDatabase()
        //await clearDatabase(db)
        //await createTables(db)
    } catch (error) {
        console.error(error)
    }}, [])
   
    const isFocused = useIsFocused();
     
    useEffect(() => {
        loadData();
    }, [isFocused])

    return (
        <View style={styles.container}>
            <BalancePanel/>
            <EntrySummary categorySummary={categorySummary}/>
            {entries &&
            <EntryList entryList={entries} showMore={true}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background,
    }, 
    title: {
        fontSize: 20,
    },
});

export default Main;
