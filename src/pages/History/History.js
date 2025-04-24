import React from 'react';
import { View, StyleSheet } from 'react-native';

import useEntries from '../../hooks/useEntries';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import EntryList from '../../components/EntryList/EntryList';
import Colors from '../../styles/colors';

const History = () => {
	const [entries] = useEntries();

    return(
        <View style={styles.container}>
			<BalanceLabel/>
			<View style={styles.container}>
				{entries &&
					<EntryList entryList={entries} showMore={false} limitHeight={false} title={'Transaction history'}/>                        
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
});

export default History;
