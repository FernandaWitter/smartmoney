import React, { useCallback, useEffect, useState } from 'react';

import { connectToDatabase } from '../../database/DBConfig';
import { getLatestEntries } from '../../database/services/entryService';
import { useIsFocused } from '@react-navigation/native';

import EntryListItem from './EntryListItem/EntryListItem';
import Container from '../Core/Container';
import { FlatList } from 'react-native';

const EntryList = ({days = 7, onPressActionButton}) => {
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
		<Container title='Latest transactions'
			actionLabelText={`Last ${days} days`}
			actionButtonText="See all transactions"
			onPressActionButton={() => {}}>
				  <FlatList
					data={entries}
					renderItem={({item, index}) => (
						<EntryListItem entry={item}
							isFirstItem={index===0}
							isLastItem={index === entries.length-1}
						/>
					)}
				/>
		</Container>
    );
};

export default EntryList;