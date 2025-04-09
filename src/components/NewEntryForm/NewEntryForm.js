import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {View,TextInput, Button, StyleSheet} from 'react-native';
import { connectToDatabase } from '../../database/DBConfig';
import { deleteEntry, getEntryByID, getLatestEntries, saveEntryItem, updateEntryItem } from '../../database/services/entryService';

const NewEntryForm = ({route}) => {
    const navigation = useNavigation();
    const entryID = route?.route?.params || {"entryID": 0}

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(2);
    const [description, setDescription] = useState('');

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase()

            if (entryID.entryID > 0){
                const currEntry = await getEntryByID(db, entryID.entryID)
                if (currEntry != null && currEntry != undefined){ 
                    setAmount(`${currEntry.amount}`)
                    setDescription(currEntry.description)
                    setCategory(`${currEntry.category}`)
                }
            }
            
        } catch (error) {
              console.error(error)
        }
    }, [])
          
    useEffect(() => {
        loadData()
    }, [loadData])


    //TODO: Validate input data
    const isValid = () => {
        if(parseFloat(amount) != 0){
            return true;
        }
        return false;
    };
    
    const onClose = () => {
        navigation.goBack();
    };

    const onSave = async () => {
        if(isValid){
            const db = await connectToDatabase()
            const amountInformed = parseFloat(amount)
            const data = {
                "id": entryID.entryID,
                "category": 1,
                "amount": amountInformed,
                "description": description
            }
            if (entryID.entryID > 0){
                await updateEntryItem(db, data)            
            } else {
                await saveEntryItem(db, data);
            }
            onClose();
        } else {

        }
        
    };
    
    const onDelete = async () => {
        const db = await connectToDatabase()
        console.log("DELETE ID")
        console.log(entryID.entryID)
        if (entryID.entryID > 0){ 
            await deleteEntry(db, entryID.entryID)
            onClose();
        }
    };

    return(
        <View style={styles.container}>
            <View>
                <TextInput 
                    style={styles.input} value={amount}
                    placeholder='Amount'
                    onChangeText={(text) => {setAmount(text)}}/>
                <TextInput 
                    style={styles.input} value={description}
                    placeholder='Description'
                    onChangeText={(text) => {setDescription(text)}}/>
                <Button style={styles.button} title="GPS"/>
                <Button style={styles.button} title="Camera"/>
            </View>
            <View>
                <Button style={styles.button} title="Salvar" 
                    onPress={onSave}/>
                <Button style={styles.button} title="Excluir" 
                    onPress={onDelete}/>
                <Button style={styles.button} title="Cancelar" 
                    onPress={onClose} />
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