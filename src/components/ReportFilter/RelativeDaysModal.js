import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionFooter, { PrimaryActionButton } from '../Core/ActionFooter';
import Colors from '../../styles/colors';

const RelativeDaysModal = ({isVisible, onConfirm, onCancel}) =>{
    const relativeDays = [1,3,7,15,30,45,60,90,180,365]
    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={isVisible}>
            <View style={styles.modal}>
                <FlatList
                    data={relativeDays}
                    renderItem={(item) => {
                        return(<TouchableOpacity style={styles.modalItem} onPress={() => {
                            onConfirm(item.item)
                            }}>
                            <Text style={styles.modalInnerText}>{`${item.item} day(s)`}</Text>
                        </TouchableOpacity>)
                    }}
                />
            
            </View>
            <View style={styles.footer}>
            <ActionFooter>
                <PrimaryActionButton title='Close' onPress={onCancel}/>
            </ActionFooter>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        backgroundColor: Colors.background
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical:10,
        marginHorizontal:20,
        paddingVertical:20,
        paddingHorizontal:20
    },
    modalInnerText: {
        fontSize: 22,
        color: Colors.white,
        textAlign: 'center'
    },
    footer:{
        flex: 1,
        maxHeight: 80
    }
})

export default RelativeDaysModal;