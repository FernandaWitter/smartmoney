import React from 'react';
import {View, StyleSheet} from 'react-native';
import BalanceLabel from '../../BalanceLabel/BalanceLabel';
import Colors from '../../../styles/colors';

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
});

export default BalancePanelLabel;