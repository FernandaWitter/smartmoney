import React from 'react';

import EntryListItem from './EntryListItem/EntryListItem';
import Container from '../Core/Container';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../styles/colors';

const EntryList = ({entryList, showMore}) => {

    return(
		<Container title='Latest transactions'
			actionButtonText="See all transactions"
			onPressActionButton={() => {}}
			showMore={showMore}>
			<View>
				{entryList.length > 0 &&
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
				}
				{entryList.length == 0 &&
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyTextMain}>No records found.</Text>
						<Text style={styles.emptyText}>Try removing the category filter or changing the specified time period.</Text>
					</View>
				}
				</View>
		</Container>
    );
};

const styles = StyleSheet.create({
	emptyContainer:{
		marginVertical:10,
		marginHorizontal: 15
	},
	emptyTextMain: {
		fontSize: 24,
		color: Colors.champagne,
		textAlign: 'center',
		marginVertical:20
	},
	emptyText: {
		fontSize: 20,
		color: Colors.champagne,
		textAlign: 'center'
	}
})

export default EntryList;