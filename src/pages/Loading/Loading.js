import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../styles/colors';
import { isInitialized } from '../../services/Welcome';

const Loading = () =>{
    const navigation = useNavigation();

    useEffect(() => {
        const makeRedirect = async () => {
            (await isInitialized()) ? navigation.navigate('Main') : navigation.navigate('Welcome')
        }
        makeRedirect();
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <ActivityIndicator color={Colors.violet} size={60}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Loading;