import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import useEntries from '../../hooks/useEntries';
import useCategorySumByDate from '../../hooks/useCategorySumByDate';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import Colors from '../../styles/colors';

const Report = () => {
    const [days, setDays] = useState(7);
    const [category, setCategory] = useState({id: 0, description: 'Select category'});
	const [entries] = useEntries(days, category.id);
	const [categorySummary] = useCategorySumByDate(days, category.id);

    return(
        <View style={styles.container}>
			<BalanceLabel/>
			<ReportFilter days={days} onChangeDays={setDays}
				category={category.description} onChangeCategory={setCategory}
			/>
			<View style={styles.container}>
				<EntrySummary categorySummary={categorySummary} days={days} showMore={false}/>
				{entries &&
					<EntryList entryList={entries} showMore={false} isReport={true}/>                        
				}
			</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    footer:{
        flex: 1,
        flexGrow: 1,
        maxHeight: 80,
        minHeight: 80,
    },
});

export default Report;
