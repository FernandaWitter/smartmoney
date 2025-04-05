import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View,TextInput, Button, StyleSheet} from 'react-native';
import { connectToDatabase } from '../../database/DBConfig';
import { saveEntryItem } from '../../database/services/entryService';

const NewEntryForm = () => {
    const navigation = useNavigation();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    //TODO: Validate input data

    const saveEntry = async () => {
        const db = await connectToDatabase()
        const amountInformed = parseFloat(amount)
        const data = {
          "category": 1,
          "amount": amountInformed,
          "description": description
        }
         await saveEntryItem(db, data);       
      }

    return(
        <View style={styles.container}>
            <View>
                <TextInput style={styles.input} value={amount} onChangeText={(text) => {setAmount(text)}}/>
                <TextInput style={styles.input} value={description} onChangeText={(text) => {setDescription(text)}}/>
                <Button style={styles.button} title="GPS"/>
                <Button style={styles.button} title="Camera"/>
            </View>
            <View>
                <Button style={styles.button} title="Adicionar" onPress={() => {
                    saveEntry();
                    navigation.goBack();
                    }}/>
                <Button style={styles.button} title="Cancelar" onPress={() => {navigation.goBack()}} />
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