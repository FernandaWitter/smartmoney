import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BalanceLabel = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Current balance</Text>
            <Text style={styles.value}>$2.064,35</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center'
    },
    label: {
        fontSize:12,
        padding: 10
    },
    value: {
        fontSize:18
    }
});

export default BalanceLabel;