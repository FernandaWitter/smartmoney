import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../Core/Container';
import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';
import Colors from '../../styles/colors';

const EntrySummary = ({categorySummary, days = 7, showMore = true}) => {
	const navigation = useNavigation();
    
    return(
		<Container title="Categories"
			actionLabelText={`Last ${days} days`}
			actionButtonText="More"
    	    showMore={showMore}
			onPressActionButton={() => {navigation.navigate('Report');}}>
			{categorySummary.length > 0 &&
				<View style={styles.container}>
					<EntrySummaryChart categorySummary={categorySummary}/>
					<EntrySummaryList summary={categorySummary}/>
				</View>
			}
			{categorySummary.length == 0 &&
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyTextMain}>No expenditure records found.</Text>
					<Text style={styles.emptyText}>Only spendings are shown in this chart. Try removing the category filter or changing the specified time period.</Text>
				</View>
			}
    	</Container>
    );
};

const styles = StyleSheet.create({
  	container: {
		flexDirection: 'row',
		marginHorizontal:10,
		marginVertical: 15,
  	},
	emptyContainer:{
		marginHorizontal: 15,
		marginVertical:10,
		paddingBottom: 15,
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
		textAlign: 'center',
	}
});

export default EntrySummary;