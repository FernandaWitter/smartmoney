import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import useEntries from '../../hooks/useEntries';
import useCategorySumByDate from '../../hooks/useCategorySumByDate';
import { connectToDatabase, createTables } from '../../database/DBConfig';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';

import Colors from '../../styles/colors';

const Main = () => {    
    const [entries] = useEntries(7,'',5);
    const [categorySummary] = useCategorySumByDate(7);

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase();
            await createTables(db);
        } catch (error) {
            console.error(error);
        }
    }, []);
   
    const isFocused = useIsFocused();
     
    useEffect(() => {
        loadData();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <BalancePanel/>
            <EntrySummary categorySummary={categorySummary}/>
            {entries &&
                <EntryList entryList={entries} showMore={true}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.background,
        flex: 1,
    }, 
    title: {
        fontSize: 20,
    },
});

export default Main;
