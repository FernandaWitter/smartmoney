import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../../styles/colors';

const BalancePanelLabel = ({currBalance}) => {
    return(
        <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current balance</Text>
            <Text style={styles.balanceValue}>{currBalance}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    balanceContainer:{
        alignItems: 'center',
        flex: 1,
       zIndex:200
    },
    balanceLabel: {
        color: Colors.white,
        fontSize:24,
        padding: 10,
        marginTop:10
    },
    balanceValue: {
        color: Colors.white,
        fontSize:36,
    }
});

export default BalancePanelLabel;