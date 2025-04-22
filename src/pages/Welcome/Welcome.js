import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Logo from '../../assets/logo.png'
import Colors from '../../styles/colors';
import WelcomeMessage from './WelcomeMessage';
import WelcomeBalanceInput from './WelcomeBalanceInput';
import moment from 'moment';
import ActionFooter, { PrimaryActionButton } from '../../components/Core/ActionFooter';
import { saveEntry } from '../../services/Entries';
import { useNavigation } from '@react-navigation/native';
import { setInitialized } from '../../services/Welcome';

const Welcome = () =>{
    const navigation = useNavigation();
    const [amount, setAmount] = useState()

    const onSave = async () => {
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm')
            
        const data = {
            "id": '',
            "category": 1,
            "amount": parseFloat(amount || 0),
            "description": 'Initial balance',
            "date": date,
            "address": '',
            "photo": ''
        }
        await saveEntry(data);
        setInitialized();
        navigation.navigate('Main')
    }

    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={Logo} style={styles.logoImage}/>
            </View>
            <WelcomeMessage/>
            <WelcomeBalanceInput amount={amount} onChangeValue={setAmount}/>
            <ActionFooter>
                <PrimaryActionButton title='Get started' onPress={onSave} />
            </ActionFooter>
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
        marginTop: 30,
    },
    logoImage: {
        height: 150,
        width: 150
    }
})

export default Welcome;