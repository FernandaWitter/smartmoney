import React from 'react';

import EntryListItem from './EntryListItem/EntryListItem';
import Container from '../Core/Container';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../styles/colors';

const EntryList = ({entryList, showMore, isReport = false}) => {

    return(
		<Container title='Latest transactions'
			actionButtonText="See all transactions"
			onPressActionButton={() => {}}
			showMore={showMore}
			footer={false}>
			<View style={[styles.container, isReport  ? {maxHeight: 250} : '']}>
				{entryList.length > 0 &&
				  <FlatList
					data={entryList}
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
	container:{
		marginTop:10,
		marginBottom: 30,
		paddingVertical:10,
	},
	emptyContainer:{
		marginVertical:10,
		marginHorizontal: 15
	},
	emptyTextMain: {
		fontSize: 20,
		color: Colors.champagne,
		textAlign: 'center',
		marginVertical:20
	},
	emptyText: {
		fontSize: 18,
		color: Colors.champagne,
		textAlign: 'center'
	}
})

export default EntryList;