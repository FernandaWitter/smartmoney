import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isInitialized } from '../../services/Welcome';
import Colors from '../../styles/colors';

const Loading = () =>{
    const navigation = useNavigation();

    useEffect(() => {
        const makeRedirect = async () => {
            (await isInitialized()) ? navigation.navigate('Main') : navigation.navigate('Welcome');
        };
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
        alignItems: 'center',
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
    },
});

export default Loading;
