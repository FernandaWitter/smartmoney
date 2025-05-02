import React from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { resetApp } from '../../services/ResetApp';

import ActionFooter, { PrimaryActionButton, SecondaryActionButton } from '../../components/Core/ActionFooter';
import Colors from '../../styles/colors';

const Reset = () => {
    const navigation = useNavigation();
 
    const onClose = () => {
        navigation.goBack();
    };

    const onDelete = async () =>{
        navigation.navigate('Welcome');
        await resetApp();
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Reset app?</Text>
                <Text style={styles.text}>Are you sure you want to reset the app and delete all saved data?</Text>
                <Text style={styles.warning}>WARNING: This action cannot be undone.</Text>
            </View>
            <View style={styles.buttons}>
                <ActionFooter>
                    <SecondaryActionButton title='Reset app' onPress={onDelete} testID={'resetAppBtn'}/>
                    <PrimaryActionButton title='Go back' onPress={onClose} testID={'cancelResetAppBtn'}/>
                </ActionFooter>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    textContainer:{
        height: '90%'
    },
    title: {
        alignSelf: 'center',
        color: Colors.champagne,
        fontSize: 28,
        marginVertical: 20,
    },
    text: {
        alignSelf: 'center',
        color: Colors.champagne,
        fontSize: 24,
        marginVertical: 20,
        padding: 15,
    },
    warning: {
        alignSelf: 'center',
        color: Colors.yellow,
        fontSize: 24,
        marginVertical: 10,
        padding: 10,
    }, 
    buttons: {
        flex: 1,
    },
});

export default Reset;
