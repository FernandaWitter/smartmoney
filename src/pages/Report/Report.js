import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { useNavigation } from '@react-navigation/native';

const Report = () => {
    const navigation = useNavigation();
    const currBalance = 789.12;

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

    return(
        <View style={styles.container}>
            <>
                <BalanceLabel currBalance={currBalance}/>
                <ReportFilter/>
                <EntrySummary summary={SUMMARY} />
                <EntryList entries={ENTRIES} />
            </>
            <>
                <Button title="Salvar"/>
                <Button title="Fechar" onPress={() => {navigation.goBack();}}/>
            </> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Report;