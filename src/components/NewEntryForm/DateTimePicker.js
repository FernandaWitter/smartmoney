import Icon from '@react-native-vector-icons/material-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Colors from '../../styles/colors';
import DatePicker from 'react-native-date-picker';

const EntryDateTimePicker = ({value, onChange}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log('time on datetimepicker')
        console.log(value)
    })
    
    const onChangeValue = date => {
        onChange(date);
        onCancel();
    };

    const onCancel = () => {
        setModalVisible(false);
    };
    
    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={() => {setOpen(true)}}>
                <Icon name='today' size={30} color={Colors.white}/>
            </TouchableOpacity>
            <DatePicker
        modal
        mode="date"
        open={open}
        date={value}
        onConfirm={(date) => {
          setOpen(false)
          onChange(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.asphalt,
        width: 59,
        height: 59,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default EntryDateTimePicker;