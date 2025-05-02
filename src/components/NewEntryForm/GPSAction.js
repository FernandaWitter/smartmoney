import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from '@react-native-vector-icons/material-icons';

import { LOCATIONIQ_KEY } from '../../environmentVariables';
import ActionFooter, { PrimaryActionButton, SecondaryActionButton } from '../Core/ActionFooter';
import Colors from '../../styles/colors';

const GPSAction = ({entry, onSetAddress, edit}) => {
    const [currLocation, setCurrLocation] = useState(entry);
    const [modalVisible, setModalVisible] = useState(false);

    const getLocation = async (lat, long) => {
        const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${long}&format=json`;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setCurrLocation(result.display_name);
            })
            .catch(error => console.error(error));
    };
    
    const onButtonPress = () => {
        if(!entry) {
            Geolocation.getCurrentPosition(
                pos => {
                    getLocation(pos.coords.latitude, pos.coords.longitude);
                },
                error => {console.error(error)}
            );
        };
    };

    const onOpen = () => {
        onButtonPress();
        setModalVisible(true);
    };

    const onSave = async () => {
        onClose();
        return onSetAddress(currLocation);
    };

    const onClose = () => {
        setModalVisible(false);
    };

    const onClearAll = () => {
        setCurrLocation('');
    };
    
    return(
        <View>
            <TouchableOpacity style={[styles.button, (edit ? {backgroundColor: Colors.blue} : {backgroundColor: Colors.asphalt})]} 
                onPress={onOpen} id='GPSBtn'>
                <Icon name='location-pin' size={30} color={Colors.white}/>
            </TouchableOpacity>

            <Modal animationType='slide' transparent={false} visible={modalVisible} style={borderRadius=10}>
                <View style={styles.modal}>
                    <Text style={styles.modalLabel}>Set location</Text>
                    <TextInput 
                        style={styles.input} value={currLocation}
                        onChangeText={(text) => { setCurrLocation(text)}}
                        multiline numberOfLines={5} id='locationInput'/>
                    <TouchableOpacity onPress={onClearAll} id='clearLocationInputBtn'>
                        <Text style={styles.clearBtn}>Clear</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.footer}>
                    <ActionFooter>
                        <SecondaryActionButton title={'Cancel'} onPress={onClose} id={'closeLocationBtn'}/>
                        <PrimaryActionButton title={'Save'} onPress={onSave} id={'saveLocationBtn'}/>                    
                    </ActionFooter>
                </View>
            </Modal>
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
    modal:{
        backgroundColor: Colors.background,
        flex: 1,
    },
    modalLabel:{
        color: Colors.white,
        fontSize: 24,
        padding: 10,
        textAlign: 'center',
    },
    clearBtn: {
        backgroundColor: Colors.background,
        color: Colors.white,
        fontSize: 18,
        marginRight: 15,
        padding: 10,
        textAlign: 'right',
    },
    input: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        color: Colors.white,
        fontSize: 28,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: 'center',
    },     
    footer:{
        flex: 1,
        maxHeight: 80,
    },
});

export default GPSAction;