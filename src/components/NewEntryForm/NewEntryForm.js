import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {View,TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { connectToDatabase } from '../../database/DBConfig';
import { deleteEntry, getCategories, getCategoryById, getEntryByID, getLatestEntries, saveEntryItem, updateEntryItem } from '../../database/services/entryService';
import MoneyInput from '../Core/MoneyInput';
import Colors from '../../styles/colors';
import CategoryPicker from '../Core/CategoryPicker';
import DateTimePicker from './DateTimePicker';
import { convertFromDateObj, convertIntoDateObj } from '../../services/dateTimeConvert';
import EntryDeleteAction from './EntryDeleteAction';
import GPSAction from './GPSAction';
import CameraAction from './CameraAction';
import ActionFooter, { PrimaryActionButton } from '../Core/ActionFooter';

const NewEntryForm = ({route}) => {
    const navigation = useNavigation();
    const entryID = route?.route?.params || {"entryID": 0}

    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState()
    const [date, setDate] = useState(new Date())
    const [categoryText, setCategoryText] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase()
            
            if (entryID.entryID > 0){ 
                const currEntry = await getEntryByID(db, entryID.entryID)
                if (currEntry != null && currEntry != undefined){ 
                    if(currEntry.category > 0){
                        const cat = await getCategoryById(db, currEntry.category)
                        setCategoryText(cat.description)
                        console.log('setting cat: ', cat.description)
                    }
                    setAmount(parseFloat(currEntry.amount))
                    setDescription(currEntry.description)
                    setCategoryId(`${currEntry.category}`)
                    setDate(convertIntoDateObj(currEntry.date))

                }
            }          
        } catch (error) {
              console.error(error)
        }
    }, [])

      const isFocused = useIsFocused();
          
    useEffect(() => {
        loadData()
    }, [isFocused])


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

            const data = {
                "id": entryID.entryID,
                "category": parseInt(categoryId),
                "amount": parseFloat(amount),
                "description": description.replace("'", "''"),
                "date": convertFromDateObj(date)
            }
            if (entryID.entryID > 0){
                console.log(await updateEntryItem(db, data))
            } else {
                console.log(await saveEntryItem(db, data));
            }
            onClose();
        } else {

        }
        
    };
    
    const onDelete = async () => {
        const db = await connectToDatabase()
        if (entryID.entryID > 0){ 
            await deleteEntry(db, entryID.entryID)
            onClose();
        }
    };

    const onSelectCategory = (item) => {
        if(item.id > 0){
            setCategoryId(item.id)
            setCategoryText(item.description)    
        }
        setModalVisible(false)
    }

    return(
        <View style={styles.container}>
            <View>
            {((categoryText && entryID.entryID) || (entryID.entryID == 0)) &&
                <View>
                    <Text style={styles.pickerLabel}>Category</Text>
                        <TouchableOpacity style={styles.pickerButton} onPress={() => {setModalVisible(true)}}>            
                            <Text style={styles.pickerButtonText}>{categoryText}</Text>
                        </TouchableOpacity>
                    <CategoryPicker 
                        modalVisible={modalVisible}
                        onChangeCategory={onSelectCategory}
                        onClose={() => setModalVisible(false)}
                        selectAll={false}
                    />
                </View>
            }
                <MoneyInput
                    value={amount}
                    onChangeValue={setAmount}
                    label='Amount'
                />    
                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} value={description}
                        onChangeText={(text) => {setDescription(text)}}
                        multiline={true}
                        />
                </View>
                <View style={styles.formActionContainer}>
                    <DateTimePicker value={date} onChange={setDate}/>
                    <GPSAction/>
                    <CameraAction/>
                </View>
            </View>
            <ActionFooter>
                {(entryID.entryID > 0) &&
                <EntryDeleteAction onOkPress={onDelete}/>
                }
                <PrimaryActionButton title="Save" onPress={onSave}/>

            </ActionFooter>            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 10,
    },
    input: {
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10
    }, 
    button:{
        margin: 10,
        padding: 10,
    },
    label:{
        fontSize:24,
        color: Colors.white,
        textAlign: 'center',
    },
    formActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        padding: 10,
        marginVertical: 20
    },
    pickerButton:{
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
    },
    pickerButtonText: {
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
    },
    pickerLabel: {
        fontSize: 24,
        color: Colors.white,
        textAlign: 'center',
    },
});

export default NewEntryForm;