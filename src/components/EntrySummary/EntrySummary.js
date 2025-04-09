import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';
import { connectToDatabase } from '../../database/DBConfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getCategories } from '../../database/services/entryService';
import Container from '../Core/Container';

const EntrySummary = ({days = 7, onPressActionButton}) => {

    const [categories, setCategories] = useState()
	const navigation = useNavigation();
    
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
        <Container title="Categories"
        	actionLabelText={`Last ${days} days`}
        	actionButtonText="More"
			onPressActionButton={() => {navigation.navigate('Report')}}>
            <EntrySummaryChart/>
            <EntrySummaryList summary={categories}/>
        </Container>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 10,
    }
});

export default EntrySummary;