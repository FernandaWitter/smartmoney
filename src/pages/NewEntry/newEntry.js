import React from 'react';
import {View, StyleSheet} from 'react-native';

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
        flex: 1,
        backgroundColor: Colors.background
    }
});

export default NewEntry;