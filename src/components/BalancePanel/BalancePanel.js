import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connectToDatabase } from '../../database/DBConfig';
import { getBalance } from '../../database/services/entryService';

import BalancePanelLabel from './BalancePanelLabel/BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart/BalancePanelChart';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/colors';
import Icon from '@react-native-vector-icons/material-icons';
import { Text } from 'react-native-svg';

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
          <LinearGradient colors={[Colors.violet, Colors.blue]}
            style={styles.panel}>
            <BalancePanelLabel currBalance={balance}/>
            <BalancePanelChart/>
          </LinearGradient>
          <TouchableOpacity onPress={() => {navigation.navigate('NewEntry')}}
            style={styles.button} >
            <Icon name='add' size={30} color={Colors.white}/>
          </TouchableOpacity>
        </View>
    );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    marginBottom: -23,
  },
  panel:{
    flex: 1,
    paddingVertical: 10
  },
  button:{
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor:Colors.green,
    borderRadius: 150,
    elevation: 5,
    height: 50,
    justifyContent:'center',
    marginTop: -25,
    marginRight: 10,
    shadowColor: Colors.black,
    width: 50,
    zIndex:100000000,    
  },
});

export default BalancePanel;