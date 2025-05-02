import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import DatePicker from 'react-native-date-picker';

import Colors from '../../styles/colors';

const EntryDateTimePicker = ({value, onChange, edit}) => {
    const [open, setOpen] = useState(false);

    return(
        <View>
            <TouchableOpacity style={[styles.button, (edit ? {backgroundColor: Colors.blue} : {backgroundColor: Colors.asphalt})]} 
                onPress={() => {setOpen(true)}} id='datePickerBtn'>
                <Icon name='today' size={30} color={Colors.white}/>
            </TouchableOpacity>
            <DatePicker
                modal
                mode="datetime"
                open={open}
                date={value}
                minuteInterval={5}
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
        alignItems: 'center',
        borderRadius: 100,
        height: 59,
        justifyContent: 'center',
        width: 59,
    }
});

export default EntryDateTimePicker;