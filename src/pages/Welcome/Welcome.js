import React, { useState } from 'react';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { saveEntry } from '../../services/Entries';
import { setInitialized } from '../../services/Welcome';

import Logo from '../../assets/logo.png';
import WelcomeMessage from '../../components/WelcomePage/WelcomeMessage';
import WelcomeBalanceInput from '../../components/WelcomePage/WelcomeBalanceInput';
import ActionFooter, { PrimaryActionButton } from '../../components/Core/ActionFooter';
import Colors from '../../styles/colors';

const Welcome = () =>{
    const navigation = useNavigation();
    const [amount, setAmount] = useState();

    const onSave = async () => {
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm');           
        const data = {
            "id": '',
            "category": 1,
            "amount": parseFloat(amount || 0),
            "description": 'Initial balance',
            "date": date,
            "address": '',
            "photo": ''
        };
        await saveEntry(data);
        await setInitialized();
        navigation.navigate('Main');
    };

    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <View style={styles.logo}>
                <Image source={Logo} style={styles.logoImage} testID='logoImg'/>
            </View>
            <WelcomeMessage/>
            <WelcomeBalanceInput amount={amount} onChangeValue={setAmount}/>
            <ActionFooter>
                <PrimaryActionButton title='Get started' onPress={onSave} testID={'getStartedBtn'}/>
            </ActionFooter>
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
        marginTop: 30,
    },
    logoImage: {
        height: 150,
        width: 150,
    },
});

export default Welcome;
