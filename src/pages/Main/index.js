import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { createTable, getDBConnection, getEntries, saveEntryItems } from '../../database/db-service';

const Main = () => {

    const [entries, setEntries] = useState()
    const currBalance = 2064.35;

    const SUMMARY = [{key: '1', description: 'Food', amount: 400},
        {key: '2', description: 'Gas', amount: 12},
        {key: '3', description: 'Rent', amount: 120},
        {key: '4', description: 'Leisure', amount: 250},
        {key: '5', description: 'Others', amount: 1200}
    ]
    
    const ENTRIES_LIST = [{key: '1', category:2, amount: 10, description: 'The Good Bakery'},
        {key: '2', category: 2, amount: 190, description: 'Aldi'},
        {key: '3', category: 3, amount: 290, description: 'One Gas Stop'}
    ]

    const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const items = await getEntries(db);
      if (items.length) {
        setEntries(items);
      } else {
        await saveEntryItems(db, ENTRIES_LIST);
        setEntries(ENTRIES_LIST);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

    return (
        <View style={styles.container}>
            <BalancePanel currBalance={currBalance}/>
            <EntrySummary summary={SUMMARY} />
            <EntryList entries={entries} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }, 
    title: {
        fontSize: 20,
    }
});

export default Main;
