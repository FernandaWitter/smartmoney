import React from 'react';
import { View, StyleSheet } from 'react-native';

import MoneyInput from '../Core/MoneyInput';
import Colors from '../../styles/colors';

const WelcomeBalanceInput = ({amount, onChangeValue}) =>{
    return(
        <View style={styles.container}>
            <MoneyInput
                value={amount}
                onChangeValue={onChangeValue}
                label='Initial balance'
                testID='initialBalanceInput'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        padding: 10,
    },
    logo: {
        alignItems: 'center',
        marginTop: 20,
    },
    logoImage: {
        height: 150,
        width: 150,
    },
});

export default WelcomeBalanceInput;
