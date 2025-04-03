import React from 'react';
import {View, StyleSheet} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';

const NewEntry = () => {
    const currBalance = 1234.56

    return(
        <View style={styles.container}>
            <BalanceLabel currBalance={currBalance}/>
            <NewEntryForm/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default NewEntry;