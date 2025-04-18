import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useCategorySumByDate from '../../hooks/useCategotySumByDate';
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
			onPressActionButton={() => {navigation.navigate('Report')}}>
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
		marginVertical: 15,
		marginHorizontal:10
  	},
	emptyContainer:{
		marginVertical:10,
		marginHorizontal: 15,
		paddingBottom: 15
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

export default EntrySummary;