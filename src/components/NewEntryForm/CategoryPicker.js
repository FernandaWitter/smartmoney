import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';

const CategoryPicker = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <Text style={styles.pickerLabel}>Category</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => {setModalVisible(true)}}>            
                <Text style={styles.pickerButtonText}>Food</Text>
            </TouchableOpacity>
            <Modal animationType='slide' transparent={false} visible={modalVisible}>
                <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerButton:{
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    pickerButtonText: {
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
    },
    pickerLabel: {
        fontSize:24,
        color: Colors.white,
        textAlign: 'center',
    }
});

export default CategoryPicker;