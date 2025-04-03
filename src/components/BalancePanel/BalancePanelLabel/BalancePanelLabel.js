import React from 'react';
import {View, StyleSheet} from 'react-native';
import BalanceLabel from '../../BalanceLabel/BalanceLabel';

const BalancePanelLabel = ({currBalance}) => {
    return(
        <View style={styles.container}>
            <BalanceLabel currBalance={currBalance}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
    },
    value: {
        fontSize: 22,
    }
});

export default BalancePanelLabel;