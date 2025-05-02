import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../../styles/colors';

const ActionFooter = ({children}) => {
    return(
        <View style={styles.container}>
            {children}
        </View>
    );
};

export const PrimaryActionButton = ({title, onPress, id}) => {
    return(
        <View>
            <TouchableOpacity style={styles.primaryButton} onPress={onPress} testID={id || 'primaryBtn'}>
                <Text style={styles.primaryButtonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export const SecondaryActionButton = ({title, onPress, id}) => {
    return(
        <View>
            <TouchableOpacity style={styles.secondaryButton} onPress={onPress} testID={id || 'secondaryBtn'}>
                <Text style={styles.secondaryButtonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',  
        bottom: 5,   
    },
    primaryButton:{
        alignSelf: 'center',
        backgroundColor: Colors.background,
        borderColor: Colors.green,
        borderRadius: 15,
        borderWidth: 2,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 30,
        paddingVertical:10,
    }, 
    primaryButtonText:{
        color: Colors.green,
        fontSize: 28,
        textAlign: 'center',
    },
    secondaryButton:{
        alignSelf: 'center',
        backgroundColor: Colors.background,
        borderColor: Colors.red,
        borderRadius: 15,
        borderWidth: 2,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical:10,
    }, 
    secondaryButtonText:{
        color: Colors.red,
        fontSize: 28,
        textAlign: 'center'
    },
});

export default ActionFooter;