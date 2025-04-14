import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { clearDatabase, connectToDatabase, createTables } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { getLatestEntries } from '../../database/services/entryService';

const Main = () => {    
  const [entries, setEntries] = useState()

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      //await clearDatabase(db)
      await createTables(db)

      const entries = await getLatestEntries(db)
      if(entries.length > 0){setEntries(entries)}

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
