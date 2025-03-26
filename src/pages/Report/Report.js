import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';

const Report = () => {
    return(
        <View style={styles.container}>
            <>
                <BalanceLabel/>
                <ReportFilter/>
                <EntrySummary/>
                <EntryList/>
            </>
            <>
                <Button title="Salvar"/>
                <Button title="Fechar"/>
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