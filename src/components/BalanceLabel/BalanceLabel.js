import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';

import useBalance from '../../hooks/useBalance';

import Colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const BalanceLabel = () => {
    const navigation = useNavigation();
    const [balance] = useBalance();

    return(
        <View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <View style={styles.header}>
				<TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}} testID='balanceLabelBackBtn'>
					<Icon name='arrow-left' size={50} color={Colors.white} />
				</TouchableOpacity>
				<View style={styles.labelWrapper}>
					<Text style={styles.label}>Current balance</Text>
				</View>
            </View>
            <LinearGradient colors={[Colors.violet, Colors.blue]} style={styles.panel}>
                <Text style={styles.value} testID='currentBalance'>{balance}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        maxHeight:150,
        minHeight: 150,
    },
    label: {
        color: Colors.white,
        flexGrow: 0,
        fontSize:26,
        padding: 10,
        paddingRight: 85,
    },
    value: {
        color: Colors.white,
        fontSize:30,
    },
    panel:{
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button:{
        alignItems: 'flex-start',
        backgroundColor: Colors.background,
        flexGrow: 0,
        justifyContent: 'flex-start',
        height:50,
        paddingTop: 5,
        width: 50,
    },
    labelWrapper:{
        alignContent:'center',
        alignItems: 'center',
        alignSelf:'center'
    }
});

export default BalanceLabel;