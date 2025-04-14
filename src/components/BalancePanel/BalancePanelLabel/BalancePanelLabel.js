import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BalanceLabel from '../../BalanceLabel/BalanceLabel';
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
    flex: 1,
    alignItems: 'center'
  },
    balanceLabel: {
        fontSize:24,
        padding: 10,
        color: Colors.white,
        marginTop:10
    },
    balanceValue: {
        fontSize:36,
        color: Colors.white,
    }
});

export default BalancePanelLabel;