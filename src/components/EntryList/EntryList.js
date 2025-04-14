import React, { useCallback, useEffect, useState } from 'react';

import { connectToDatabase } from '../../database/DBConfig';
import { getLatestEntries } from '../../database/services/entryService';
import { useIsFocused } from '@react-navigation/native';

import EntryListItem from './EntryListItem/EntryListItem';
import Container from '../Core/Container';
import { FlatList, View } from 'react-native';

const EntryList = ({entryList, showMore}) => {

    return(
		<Container title='Latest transactions'
			actionButtonText="See all transactions"
			onPressActionButton={() => {}}
			showMore={showMore}>
			<View>
				  <FlatList
					data={entryList}
          scrollEnabled={false}
					renderItem={({item, index}) => (
						<EntryListItem entry={item}
							isFirstItem={index===0}
							isLastItem={index === entryList.length-1}
						/>
					)}
				/>
				</View>
		</Container>
    );
};

export default EntryList;