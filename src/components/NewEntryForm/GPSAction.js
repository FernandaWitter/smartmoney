import React, { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from '../../styles/colors'
import Icon from '@react-native-vector-icons/material-icons'
import Geolocation from '@react-native-community/geolocation'
import { LOCATIONIQ_KEY } from '../../environmentVariables'
import ActionFooter, { PrimaryActionButton, SecondaryActionButton } from '../Core/ActionFooter'

const GPSAction = ({entry, onSetAddress}) => {
    const [currLocation, setCurrLocation] = useState(entry)
    const [modalVisible, setModalVisible] = useState(false)

    const getLocation = async (lat, long) => {
        const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${long}&format=json`
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setCurrLocation(result.display_name)
            })
            .catch(error => console.log(error));
    }
    
    const onButtonPress = () => {
        if(!entry) {
            Geolocation.getCurrentPosition(
                pos => {
                    getLocation(pos.coords.latitude, pos.coords.longitude)
                },
                error => {console.log(error)}
            );
        }
    };

    const onOpen = () => {
        onButtonPress()
        setModalVisible(true)
    }

    const onSave = async () => {
        onClose()
        return onSetAddress(currLocation)
    }

    const onClose = () => {
        setModalVisible(false)
    }

    const onClearAll = () => {
        setCurrLocation('')
    }
    
    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={onOpen}>
                <Icon name='location-pin' size={30} color={Colors.white}/>
            </TouchableOpacity>

        <Modal animationType='slide' transparent={false} visible={modalVisible} style={borderRadius=10}>
            <View style={styles.modal}>
            <Text style={styles.modalLabel}>Set location</Text>
            <TextInput 
                style={styles.input} value={currLocation}
                onChangeText={(text) => { setCurrLocation(text)}}
                multiline numberOfLines={5}/>
            <TouchableOpacity onPress={onClearAll}>
                <Text style={styles.clearBtn}>Clear</Text>
            </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
                <ActionFooter>
                        <SecondaryActionButton title={'Cancel'} onPress={onClose}/>
                    <PrimaryActionButton title={'Save'} onPress={onSave}/>
                    
                </ActionFooter>
            </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.asphalt,
        width: 59,
        height: 59,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    modal:{
        flex: 1,
        backgroundColor: Colors.background,
    },
    modalLabel:{
        fontSize: 24,
        color: Colors.white,
        textAlign: 'center',
        padding: 10,
    },
    clearBtn: {
        fontSize: 18,
        backgroundColor: Colors.background,
        color: Colors.white,
        textAlign: 'right',
        padding: 10,
        marginRight: 15
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
    footer:{
        flex: 1,
        maxHeight: 80
    }
})

export default GPSAction;