import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import DatePicker from 'react-native-date-picker';

const EntryDateTimePicker = ({value, onChange, edit}) => {
    const [open, setOpen] = useState(false)

    return(
        <View>
            <TouchableOpacity style={[styles.button, (edit ? {backgroundColor: Colors.blue} : {backgroundColor: Colors.asphalt})]} onPress={() => {setOpen(true)}}>
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
        width: 59,
        height: 59,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default EntryDateTimePicker;