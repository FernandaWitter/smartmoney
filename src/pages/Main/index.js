import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { getBalance, getCategories, getLatestEntries} from '../../database/services/entryService';
import { clearDatabase, connectToDatabase, createTables } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';

const Main = () => {

  const [balance, setBalance] = useState()
  const [entries, setEntries] = useState()
  const [categories, setCategories] = useState()
  
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      //await clearDatabase(db)
      await createTables(db)

      const balance = await getBalance(db)
      if (balance != null && balance != undefined){ setBalance(balance)}

      const entries = await getLatestEntries(db)
      if(entries.length > 0){setEntries(entries)}

      const cat = await getCategories(db)
      if(cat.length > 0){setCategories(cat)}

    } catch (error) {
      console.error(error)
    }
  }, [])

  const isFocused = useIsFocused();
  
  useEffect(() => {
    loadData();
  }, [isFocused])

    return (
        <View style={styles.container}>
            <BalancePanel currBalance={balance}/>
            <EntrySummary summary={categories} />
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
    },
});

export default Main;
