import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import useSingleEntry from '../../hooks/useSingleEntry';

import MoneyInput from '../Core/MoneyInput';
import Colors from '../../styles/colors';
import CategoryPicker from '../Core/CategoryPicker';
import DateTimePicker from './DateTimePicker';
import EntryDeleteAction from './EntryDeleteAction';
import GPSAction from './GPSAction';
import CameraAction from './CameraAction';
import ActionFooter, { PrimaryActionButton } from '../Core/ActionFooter';


const NewEntryForm = ({route}) => {
    const navigation = useNavigation();
    const entryID = route?.route?.params || {"entryID": 0};
    const [modalVisible, setModalVisible] = useState(false);
    const [entry, saveEntry, updateEntry, deleteEntry] = useSingleEntry(entryID);
    const [errors, setErrors] = useState([]);
    const [currEntry, setCurrEntry] = useState({
        id: '',
        amount: '',
        date: new Date(),
        category: '',
        categoryText:'',
        isDateChanged: false,
        isDescriptionChanged: false,
        address: '',
        photo:'',
        isPhotoChanged: false
    });

    const isValid = () => {
        let isValid = true
        let err = []
        if(!(currEntry.amount > 0) && !entry.amount){
            err.push('amount')
            isValid = false
        }
        if(!(currEntry.category > 0) && !(entry.category > 0)){
            err.push('category')
            isValid = false
        }
        setErrors(err)
        return isValid;
    };
    
    const onClose = () => {
        navigation.goBack();
    };

    const onSave = async () => {
        let date = entry.date;
        
        if(!entry.date || currEntry.isDateChanged){
            date = moment(currEntry.date).format('YYYY-MM-DD HH:mm');
        };
        
        if(isValid()){
            const amountInformed = parseFloat(currEntry.amount || entry.amount);
            const catSelected = parseInt(currEntry.category|| entry.category);
            const data = {
                "id": entry.id,
                "category": catSelected,
                "amount": catSelected == 1 ? amountInformed : amountInformed*(-1) ,
                "description": currEntry.description ? currEntry.description.replace("'", "''") : entry.description,
                "date": date,
                "address": currEntry.address || entry.address || '',
                "photo": currEntry.photo || entry.photo || ''
            };
            if (entryID.entryID > 0){
                await updateEntry(data);
            } else {
                await saveEntry(data);
            };
            onClose();
        }
    };
    
    const onDelete = async () => {
        if (entryID.entryID > 0){ 
            await deleteEntry(entryID.entryID);
            onClose();
        }
    };

    const onSelectCategory = (item) => {
        if(item.id > 0){
            setErrors(errors.filter(el => (el != 'category')));
            setCurrEntry(() => ({ ...currEntry, category: item.id, categoryText: item.description }));
        }
        setModalVisible(false);
    };

    const onSetAmount = (val) => {
        if(val > 0){
            setErrors(errors.filter(el => (el != 'amount')));
        }
        setCurrEntry(() => ({ ...currEntry, amount: val}));
    };

    const onSetDate = (date) => {
        setCurrEntry(() => ({ ...currEntry, date: date, isDateChanged: true}));
    };

    const onSetAddress = (location) => {
        setCurrEntry(() => ({ ...currEntry, address: location}));
    };

    const onChangePhoto = (capturedPhoto) => {
        setCurrEntry(() => ({ ...currEntry, photo: capturedPhoto, isPhotoChanged: true}));
    };

    return(
        <View style={styles.container}>
            <View>
            {((entry.category && entryID.entryID) || (entryID.entryID == 0)) &&
                <View>
                    <Text style={styles.pickerLabel}>Category</Text>
                    <TouchableOpacity style={[styles.pickerButton, (errors.includes('category') ? {borderColor: Colors.red, borderWidth: 2} : '')]} 
                        onPress={() => {setModalVisible(true)}} testID='categorySelect'>
                        <Text style={styles.pickerButtonText}>{currEntry.categoryText || entry.categoryText}</Text>
                    </TouchableOpacity>
                    {errors.includes('category') &&
                        <Text style={styles.errorMessage} testID='categoryErrorMsg'>Category is mandatory.</Text>
                    }
                    <CategoryPicker 
                        modalVisible={modalVisible}
                        onChangeCategory={onSelectCategory}
                        onClose={() => setModalVisible(false)}
                        selectAll={false} />
                </View>
            }
                <MoneyInput
                    value={entry.amount}
                    onChangeValue={onSetAmount}
                    label='Amount'
                    style={errors.includes('amount') ? {borderColor: Colors.red, borderWidth: 2} : ''}
                    />   
                {errors.includes('amount') &&
                    <Text style={styles.errorMessage} testID='amountErrorMsg'>The amount must be greater than $ 0.00.</Text>
                } 
                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} value={currEntry.isDescriptionChanged? currEntry.description : entry.description}
                        onChangeText={(text) => { setCurrEntry(() => ({ ...currEntry, description: text, isDescriptionChanged: true }))}}
                        multiline={true} testID='descriptionInput'/>
                </View>
                {((entry.date && entryID.entryID) || (entryID.entryID == 0)) &&
                    <View style={styles.formActionContainer}>
                        <DateTimePicker value={entryID.entryID != 0 && !currEntry.isDateChanged ? moment(entry.date).toDate() : currEntry.date} onChange={onSetDate} edit={entry.date}/>
                        <GPSAction entry={entry.address || currEntry.address} onSetAddress={onSetAddress} edit={entry.address}/>
                        <CameraAction photo={currEntry.isPhotoChanged ? currEntry.photo : entry.photo} onChangePhoto={onChangePhoto} edit={entry.photo}/>
                    </View>
                }
            </View>
            <ActionFooter>
                {(entryID.entryID > 0) &&
                    <EntryDeleteAction onOkPress={onDelete}/>
                }
                <PrimaryActionButton title="Save" onPress={onSave} testID={'saveEntry'}/>
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
        color: Colors.white,
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        fontSize: 28,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: 'center',
    }, 
    button:{
        margin: 10,
        padding: 10,
    },
    label:{
        color: Colors.white,
        fontSize:24,
        textAlign: 'center',
    },
    formActionContainer: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginVertical: 20,
    },
    pickerButton:{
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
    },
    pickerButtonText: {
        color: Colors.white,
        fontSize: 28,
        textAlign: 'center',
    },
    errorMessage:{
        alignSelf: 'center',
        color: Colors.red,
        fontSize: 18,
        marginBottom: 15,
    },
    pickerLabel: {
        color: Colors.white,
        fontSize: 24,
        textAlign: 'center',
    },
});

export default NewEntryForm;