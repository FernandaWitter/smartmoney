import React, { useCallback, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { clearDatabase, connectToDatabase, createTables } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';

const Main = () => {

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      //await clearDatabase(db)
      await createTables(db)

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
            <BalancePanel/>
            <EntrySummary/>
            <EntryList/>
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
