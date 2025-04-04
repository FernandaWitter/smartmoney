import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import {connectToDatabase, createTables, getBalance, getCategories, getEntries} from '../../database/db-service';

const Main = () => {

  const [balance, setBalance] = useState()
  const [entries, setEntries] = useState()
  const [categories, setCategories] = useState()
  
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)

      const balance = await getBalance(db)
      if (balance != null && balance != undefined){ setBalance(balance)}

      const entries = await getEntries(db)
      if(entries.length > 0){setEntries(entries)}

      const cat = await getCategories(db)
      if(cat.length > 0){setCategories(cat)}

    } catch (error) {
      console.error(error)
    }
  }, [])
  
  useEffect(() => {
    loadData()
  }, [loadData])

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
    }
});

export default Main;
