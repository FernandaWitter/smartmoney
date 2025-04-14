import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../styles/colors'
import Icon from '@react-native-vector-icons/material-icons'

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
        )
    }

    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.red,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 30,
        paddingVertical:10,
        alignSelf: 'center'
    }, 
    buttonText:{
        fontSize: 28,
        color: Colors.red,
        textAlign: 'center'
    }
})

export default EntryDeleteAction