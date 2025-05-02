import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useEntries from '../../hooks/useEntries';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import EntryList from '../../components/EntryList/EntryList';
import ActionFooter, { PrimaryActionButton, SecondaryActionButton } from '../../components/Core/ActionFooter';
import Colors from '../../styles/colors';

const History = () => {
    const navigation = useNavigation();
	const [entries] = useEntries();

    const onClose = () => {
        navigation.goBack();
    };

    const onReset = () =>{
        navigation.navigate('Reset')
    };

    return(
        <View style={styles.container}>
			<BalanceLabel/>
			<View style={styles.container}>
				{entries &&
					<EntryList entryList={entries} showMore={false} limitHeight={false} title={'Transaction history'}/>                        
				}
			</View>
            <ActionFooter>
                <SecondaryActionButton title='Delete all' onPress={onReset} id={'deleteAllEntriesBtn'}/>
                <PrimaryActionButton title='Close' onPress={onClose} id={'closeHistoryBtn'}/>
            </ActionFooter>
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
