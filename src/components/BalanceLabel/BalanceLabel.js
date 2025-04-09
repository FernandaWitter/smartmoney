import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

const BalanceLabel = ({currBalance}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Current balance</Text>
            <Text style={styles.value}>{currBalance}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    label: {
        fontSize:14,
        padding: 10,
        color: Colors.white,
    },
    value: {
        fontSize:36,
        color: Colors.white,
    }
});

export default BalanceLabel;