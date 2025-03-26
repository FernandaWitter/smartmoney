import React from 'react';
import {View, StyleSheet} from 'react-native';

import EntrySummaryChart from './EntrySummaryChart/EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList/EntrySummaryList';

const EntrySummary = () => {
    return(
        <View style={styles.container}>
            <EntrySummaryChart/>
            <EntrySummaryList/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 10,
    }
});

export default EntrySummary;