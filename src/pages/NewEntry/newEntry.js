import React from 'react';
import { View, StyleSheet } from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';
import Colors from '../../styles/colors';

const NewEntry = (route) => { 
    return(
        <View style={styles.container}>
            <BalanceLabel/>
            <NewEntryForm route={route}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
    },
});

export default NewEntry;
