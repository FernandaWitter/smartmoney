import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

import CameraPickerModal from './CameraPickerModal';
import Colors from '../../styles/colors';

const CameraAction = ({photo, onChangePhoto, edit}) => {
    const [showModal, setShowModal] = useState(false);

    const onSave = (capturedPhoto) => {
        onChangePhoto(capturedPhoto);
        onClose();
    };

    const onClose = () => {setShowModal(false);};
   
    return(
        <View>
            <TouchableOpacity style={[styles.button, (edit ? {backgroundColor: Colors.blue} : {backgroundColor: Colors.asphalt})]} onPress={() => {setShowModal(true);}}>
                <Icon name='camera-alt' size={30} color={Colors.white} testID='cameraBtn'/>
            </TouchableOpacity>
            <CameraPickerModal photo={photo} showModal={showModal} onSave={onSave} onClose={onClose}/>
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
    }, 
});

export default CameraAction;