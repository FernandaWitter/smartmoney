import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isInitialized } from '../../services/Welcome';
import Colors from '../../styles/colors';
import { connectToDatabase, createTables } from '../../database/DBConfig';

const Loading = () =>{
    const navigation = useNavigation();

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase();
            await createTables(db);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const makeRedirect = async () => {
            (await isInitialized()) ? navigation.navigate('Main') : navigation.navigate('Welcome');
        };
        loadData();
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
