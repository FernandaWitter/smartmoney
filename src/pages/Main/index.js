import React from 'react';
import { View, StyleSheet } from 'react-native';

import useEntries from '../../hooks/useEntries';
import useCategorySumByDate from '../../hooks/useCategorySumByDate';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';

import Colors from '../../styles/colors';

const Main = () => {    
    const [entries] = useEntries(7,'',5);
    const [categorySummary] = useCategorySumByDate(7);

    return (
        <View style={styles.container}>
            <BalancePanel/>
            <EntrySummary categorySummary={categorySummary}/>
            {entries &&
                <EntryList entryList={entries} showMore={true}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.background,
        flex: 1,
    }, 
    title: {
        fontSize: 20,
    },
});

export default Main;
