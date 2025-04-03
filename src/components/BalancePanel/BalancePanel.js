import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import BalancePanelLabel from './BalancePanelLabel/BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart/BalancePanelChart';
import { useNavigation } from '@react-navigation/native';

const BalancePanel = ({currBalance}) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <BalancePanelLabel currBalance={currBalance}/>
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