import React, { useCallback, useEffect, useState } from 'react';
import {View, Button, StyleSheet} from 'react-native';

import BalancePanelLabel from './BalancePanelLabel/BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart/BalancePanelChart';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { connectToDatabase } from '../../database/DBConfig';
import { getBalance } from '../../database/services/entryService';

const BalancePanel = () => {

      const navigation = useNavigation();
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
    
      const isFocused = useIsFocused();
      
      useEffect(() => {
        loadData();
      }, [isFocused])

    return(
        <View style={styles.container}>
            <BalancePanelLabel currBalance={balance}/>
            <BalancePanelChart/>
            <Button title="Add transaction" onPress={() => {navigation.navigate('NewEntry')}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});

export default BalancePanel;