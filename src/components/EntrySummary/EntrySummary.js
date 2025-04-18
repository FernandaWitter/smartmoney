import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useCategorySumByDate from '../../hooks/useCategotySumByDate';
import Container from '../Core/Container';
import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';

const EntrySummary = ({categorySummary, days = 7, showMore = true}) => {
	const navigation = useNavigation();
    
    return(
		<Container title="Categories"
			actionLabelText={`Last ${days} days`}
			actionButtonText="More"
    	    showMore={showMore}
			onPressActionButton={() => {navigation.navigate('Report')}}>
			<View style={styles.container}>
				<EntrySummaryChart categorySummary={categorySummary}/>
        	    <EntrySummaryList summary={categorySummary}/>
            </View>
    	</Container>
    );
};

const styles = StyleSheet.create({
  	container: {
		flexDirection: 'row',
		marginVertical: 15,
		marginHorizontal:10
  	}
})

export default EntrySummary;