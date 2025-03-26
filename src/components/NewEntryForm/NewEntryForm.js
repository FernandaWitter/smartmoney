import React from 'react';
import {View,TextInput, Button, StyleSheet} from 'react-native';

const NewEntryForm = () => {
    return(
        <View style={styles.container}>
            <View>
                <TextInput style={styles.input}/>
                <TextInput style={styles.input}/>
                <Button style={styles.button} title="GPS"/>
                <Button style={styles.button} title="Camera"/>
            </View>
            <View>
                <Button style={styles.button} title="Adicionar"/>
                <Button style={styles.button} title="Cancelar"/>
            </View>            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
    }, 
    button:{
        margin: 10,
        padding: 10,
    }
});

export default NewEntryForm;