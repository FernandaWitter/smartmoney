import React, { useCallback, useEffect, useState } from 'react';

import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';
import { connectToDatabase } from '../../database/DBConfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getCategorySummary } from '../../database/services/entryService';
import Container from '../Core/Container';

const EntrySummary = ({days = 7}) => {

    const [categories, setCategories] = useState()
	const navigation = useNavigation();
    
    const loadData = useCallback(async () => {
        try {
          const db = await connectToDatabase()
    
          const cat = await getCategorySummary(db)
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
        showMore={true}
				onPressActionButton={() => {navigation.navigate('Report')}}>
				<EntrySummaryChart/>
        	    <EntrySummaryList summary={categories}/>
    	    </Container>
    );
};

export default EntrySummary;