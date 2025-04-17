import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {View,TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';

import MoneyInput from '../Core/MoneyInput';
import Colors from '../../styles/colors';
import CategoryPicker from '../Core/CategoryPicker';
import DateTimePicker from './DateTimePicker';
import EntryDeleteAction from './EntryDeleteAction';
import GPSAction from './GPSAction';
import CameraAction from './CameraAction';
import ActionFooter, { PrimaryActionButton } from '../Core/ActionFooter';
import useSingleEntry from '../../hooks/useSingleEntry';
import moment from 'moment';

const NewEntryForm = ({route}) => {
    const navigation = useNavigation();
    const entryID = route?.route?.params || {"entryID": 0}
    const [modalVisible, setModalVisible] = useState(false);
    const [entry, saveEntry, updateEntry, deleteEntry] = useSingleEntry(entryID)
    const [currEntry, setCurrEntry] = useState({
        id: '',
        amount: '',
        date: new Date(),
        category: '',
        categoryText:'',
        isDateChanged: false,
        isDescriptionChanged: false
    })

    //TODO: Validate input data
    const isValid = () => {
        console.log('isValid: ', parseFloat(amount))
        if(parseFloat(amount) != 0){
            return true;
        }
        return false;
    };
    
    const onClose = () => {
        navigation.goBack();
    };

    const onSave = async () => {
        let date = entry.date
        if(!entry.date || currEntry.isDateChanged){
            date = moment(currEntry.date).format('YYYY-MM-DD')
        }
        if(isValid){
            const amountInformed = parseFloat(currEntry.amount || entry.amount)
            const catSelected = parseInt(currEntry.category|| entry.category)
            const data = {
                "id": entry.id,
                "category": catSelected,
                "amount": catSelected == 1 ? amountInformed : amountInformed*(-1) ,
                "description": currEntry.description ? currEntry.description.replace("'", "''") : entry.description,
                "date": date
            }
            if (entryID.entryID > 0){
                await updateEntry(data)
            } else {
                await saveEntry(data);
            }
            onClose();
        } else {}
    };
    
    const onDelete = async () => {
        if (entryID.entryID > 0){ 
            await deleteEntry(entryID.entryID)
            onClose();
        }
    };

    const onSelectCategory = (item) => {
        if(item.id > 0){
            setCurrEntry(() => ({ ...currEntry, category: item.id, categoryText: item.description }))
        }
        setModalVisible(false)
    }

    const onSetAmount = (val) => {
        setCurrEntry(() => ({ ...currEntry, amount: val}))
    }

    const onSetDate = (date) => {
        console.log('onSetDate: ', date.toString())
        setCurrEntry(() => ({ ...currEntry, date: date, isDateChanged: true}))
    }

    return(
        <View style={styles.container}>
            <View>
            {((entry.category && entryID.entryID) || (entryID.entryID == 0)) &&
                <View>
                    <Text style={styles.pickerLabel}>Category</Text>
                        <TouchableOpacity style={styles.pickerButton} onPress={() => {setModalVisible(true)}}>            
                            <Text style={styles.pickerButtonText}>{currEntry.categoryText || entry.categoryText}</Text>
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
                    value={entry.amount}
                    onChangeValue={onSetAmount}
                    label='Amount'
                />    
                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} value={currEntry.isDescriptionChanged? currEntry.description : entry.description}
                        onChangeText={(text) => { setCurrEntry(() => ({ ...currEntry, description: text, isDescriptionChanged: true }))}}
                        multiline={true}
                        />
                </View>
                <View style={styles.formActionContainer}>
                    {((entry.date && entryID.entryID) || (entryID.entryID == 0)) &&
                    <DateTimePicker value={entryID.entryID != 0 ? moment(entry.date).toDate() : currEntry.date} onChange={onSetDate}/>
                    }
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