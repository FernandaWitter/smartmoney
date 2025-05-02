import React from 'react';
import { Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';

const EntryDeleteAction = ({onOkPress}) => {
    const onDelete = () =>{
        Alert.alert(
            'Delete entry?',
            'Do you wish to delete this entry? This action cannot be undone.',
            [
                {text: 'No', style:'cancel'},
                {text: 'Yes', onPress: () => onOkPress()}
            ],
            {cancelable: false}
        );
    };

    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={onDelete} testID='deleteEntryBtn'>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        alignSelf: 'center',
        backgroundColor: Colors.background,
        borderColor: Colors.red,
        borderRadius: 15,
        borderWidth: 2,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 30,
        paddingVertical:10,
    }, 
    buttonText:{
        color: Colors.red,
        fontSize: 28,
        textAlign: 'center',
    },
});

export default EntryDeleteAction;