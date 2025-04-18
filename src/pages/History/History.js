import React from 'react';
import {View, StyleSheet} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import EntryList from '../../components/EntryList/EntryList';
import Colors from '../../styles/colors';
import useEntries from '../../hooks/useEntries';

const History = () => {

	const [entries] = useEntries()

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
       flex: 1,
        backgroundColor: Colors.background
    }
});

export default History;