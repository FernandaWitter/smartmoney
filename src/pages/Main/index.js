import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>Main</Text>
            <BalancePanel/>
            <EntrySummary/>
            <EntryList/>
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
