import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    title: {
        color: Colors.white,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
    },
    message: {
        color: Colors.white,
        fontSize: 22,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
    }
})

export default WelcomeMessage;