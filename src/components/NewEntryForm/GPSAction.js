import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '../../styles/colors'
import Icon from '@react-native-vector-icons/material-icons'

const GPSAction = () => {
    return(
        <View>
            <TouchableOpacity style={styles.button}>
                <Icon name='location-pin' size={30} color={Colors.white}/>
            </TouchableOpacity>
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
    }
})

export default GPSAction;