import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import BalancePanelLabel from './BalancePanelLabel/BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart/BalancePanelChart';

const BalancePanel = () => {
    return(
        <View style={styles.container}>
            <BalancePanelLabel/>
            <BalancePanelChart/>
            <Button title="Add transaction"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});

export default BalancePanel;