import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';

const ActionFooter = ({children}) => {
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

export const PrimaryActionButton = ({title, onPress}) => {
    return(
        <View>
            <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
                <Text style={styles.primaryButtonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const SecondaryActionButton = ({title, onPress}) => {
    return(
        <View>
            <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
                <Text style={styles.secondaryButtonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        //paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        //marginVertical: 10,
        flex: 1,
    },
    primaryButton:{
        backgroundColor: Colors.backgroundColor,
        borderWidth: 2,
        borderColor: Colors.green,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 30,
        paddingVertical:10,
        alignSelf: 'center'
    }, 
    primaryButtonText:{
        fontSize: 28,
        color: Colors.green,
        textAlign: 'center'
    },
    secondaryButton:{
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.red,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical:10,
        alignSelf: 'center'
    }, 
    secondaryButtonText:{
        fontSize: 28,
        color: Colors.red,
        textAlign: 'center'
    },
})

export default ActionFooter;