import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import EntryListItem from './EntryListItem/EntryListItem';
import { connectToDatabase } from '../../database/DBConfig';
import { getLatestEntries } from '../../database/services/entryService';
import { useIsFocused } from '@react-navigation/native';

const EntryList = () => {
    const [entries, setEntries] = useState()

     const loadData = useCallback(async () => {
        try {
          const db = await connectToDatabase()

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

    return(
        <View style={styles.container}>
            <EntryListItem entries={entries}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10
    }
});

export default EntryList;