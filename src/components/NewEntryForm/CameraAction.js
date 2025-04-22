import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '../../styles/colors'
import Icon from '@react-native-vector-icons/material-icons'
import CameraPickerModal from './CameraPickerModal'

const CameraAction = ({photo, onChangePhoto, edit}) => {
    const [showModal, setShowModal] = useState(false)

    const onSave = (capturedPhoto) => {
        onChangePhoto(capturedPhoto);
        onClose();
    }

    const onClose = () => {setShowModal(false)}
   
    return(
        <View>
            <TouchableOpacity style={[styles.button, (edit ? {backgroundColor: Colors.blue} : {backgroundColor: Colors.asphalt})]} onPress={() => {setShowModal(true)}}>
                <Icon name='camera-alt' size={30} color={Colors.white}/>
            </TouchableOpacity>
            <CameraPickerModal photo={photo} showModal={showModal} onSave={onSave} onClose={onClose}/>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width: 59,
        height: 59,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
})

export default CameraAction;