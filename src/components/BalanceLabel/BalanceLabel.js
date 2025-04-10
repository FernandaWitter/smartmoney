import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { connectToDatabase } from '../../database/DBConfig';
import { getBalance } from '../../database/services/entryService';

import Colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const BalanceLabel = () => {

    const [balance, setBalance] = useState()

    const loadData = useCallback(async () => {
      try {
        const db = await connectToDatabase()
        
        const balance = await getBalance(db)
          if (balance != null && balance != undefined){ setBalance(balance)}
    
        } catch (error) {
          console.error(error)
        }
      }, [])
      
      useEffect(() => {
        loadData()
      }, [loadData])

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Current balance</Text>
            <LinearGradient colors={[Colors.violet, Colors.blue]} style={styles.panel}>
                <Text style={styles.value}>{balance}</Text>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    label: {
        fontSize:18,
        padding: 20,
        color: Colors.white,
    },
    value: {
        fontSize:36,
        color: Colors.white,
    },
    panel:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 10,
    }
});

export default BalanceLabel;