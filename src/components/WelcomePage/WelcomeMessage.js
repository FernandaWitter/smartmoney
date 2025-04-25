import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../styles/colors';

const WelcomeMessage = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.message}>To use SmartMoney, you need to inform your current balance:</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        padding: 10,
    },
    title: {
        color: Colors.white,
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    message: {
        color: Colors.white,
        fontSize: 22,
        marginBottom: 40,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default WelcomeMessage;
