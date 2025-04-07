import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';
import { connectToDatabase } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';
import { getCategories } from '../../database/services/entryService';

const EntrySummary = ({summary}) => {

    const [categories, setCategories] = useState()
    
    const loadData = useCallback(async () => {
        try {
          const db = await connectToDatabase()
    
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

    return(
        <View style={styles.container}>
            <EntrySummaryChart/>
            <EntrySummaryList summary={categories}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 10,
    }
});

export default EntrySummary;