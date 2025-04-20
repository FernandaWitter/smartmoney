import Icon from '@react-native-vector-icons/material-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import DatePicker from 'react-native-date-picker';

const EntryDateTimePicker = ({value, onChange}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log('time on datetimepicker')
        console.log(value.toString())
    })
    
    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={() => {setOpen(true)}}>
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
        backgroundColor: Colors.asphalt,
        width: 59,
        height: 59,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default EntryDateTimePicker;