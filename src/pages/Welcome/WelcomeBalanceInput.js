import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Logo from '../../assets/logo.png'
import Colors from '../../styles/colors';
import MoneyInput from '../../components/Core/MoneyInput';

const WelcomeBalanceInput = ({amount, onChangeValue}) =>{
    return(
        <View style={styles.container}>
            <MoneyInput
                value={amount}
                onChangeValue={onChangeValue}
                label='Initial balance'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    logo: {
        alignItems: 'center',
        marginTop: 20,
    },
    logoImage: {
        height: 150,
        width: 150
    }
})

export default WelcomeBalanceInput;