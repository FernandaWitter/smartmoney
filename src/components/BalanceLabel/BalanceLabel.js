import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { connectToDatabase } from '../../database/DBConfig';
import { getBalance } from '../../database/services/entryService';

import Colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import useBalance from '../../hooks/useBalance';

const BalanceLabel = () => {
    const navigation = useNavigation();
    const [balance] = useBalance();

    return(
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}}>
                <Icon
                  name='arrow-left'
                  size={50}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Current balance</Text>
              </View>
            </View>
            <LinearGradient colors={[Colors.violet, Colors.blue]} style={styles.panel}>
                <Text style={styles.value}>{balance}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        maxHeight:150,
        minHeight: 150
    },
    label: {
        fontSize:26,
        padding: 10,
        color: Colors.white,
        flexGrow: 0,
        paddingRight: 85,
    },
    value: {
        fontSize:30,
        color: Colors.white,
    },
    panel:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 10,
        alignItems: 'center'
    },
    header:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button:{
      backgroundColor: Colors.background,
      height:50,
      width: 50,
      paddingTop: 5,
      flexGrow: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    labelWrapper:{
      alignContent:'center',
      alignItems: 'center',
      alignSelf:'center'
    }
});

export default BalanceLabel;