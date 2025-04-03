import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';

const Main = () => {

    const currBalance = 2064.35;

    const SUMMARY = [{key: '1', description: 'Food', amount: 400},
        {key: '2', description: 'Gas', amount: 12},
        {key: '3', description: 'Rent', amount: 120},
        {key: '4', description: 'Leisure', amount: 250},
        {key: '5', description: 'Others', amount: 1200}
    ]
    
    const ENTRIES = [{key: '1', description: 'The Good Bakery', amount: 10},
        {key: '2', description: 'Aldi', amount: 190},
        {key: '3', description: 'One Gas Stop', amount: 290}
    ]

    return (
        <View style={styles.container}>
            <BalancePanel currBalance={currBalance}/>
            <EntrySummary summary={SUMMARY} />
            <EntryList entries={ENTRIES} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }, 
    title: {
        fontSize: 20,
    }
});

export default Main;
