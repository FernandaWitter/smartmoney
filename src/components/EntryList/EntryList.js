import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../Core/Container';
import EntryListItem from './EntryListItem/EntryListItem';
import Colors from '../../styles/colors';

const EntryList = ({entryList, showMore, isReport = false, limitHeight, title}) => {
	const navigation = useNavigation();
	
    return(
		<Container title= {title ||'Latest transactions'}
			actionButtonText="See all transactions"
			showMore={showMore}
			limitHeight={limitHeight}
			onPressActionButton={() => {navigation.navigate('History');}}>
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
		marginBottom: 10,
		marginTop:10,
		paddingVertical:10,
	},
	emptyContainer:{
		marginHorizontal: 15,
		marginVertical:10,
	},
	emptyTextMain: {
		color: Colors.champagne,
		fontSize: 20,
		marginVertical:20,
		textAlign: 'center',
	},
	emptyText: {
		color: Colors.champagne,
		fontSize: 18,
		textAlign: 'center'
	}
});

export default EntryList;