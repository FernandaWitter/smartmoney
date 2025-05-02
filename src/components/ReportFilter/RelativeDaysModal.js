import React from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

import ActionFooter, { PrimaryActionButton } from '../Core/ActionFooter';
import Colors from '../../styles/colors';

const RelativeDaysModal = ({isVisible, onConfirm, onCancel}) =>{
    const relativeDays = [1,3,7,15,30,45,60,90,180,365];
    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={isVisible}>
            <View style={styles.modal}>
                <FlatList
                    data={relativeDays}
                    renderItem={(item) => {
                        return(
                            <TouchableOpacity style={styles.modalItem} testID={item.item + 'DaysBtn'}
                                onPress={() => {onConfirm(item.item)}}>
                                <Text style={styles.modalInnerText}>{`${item.item} day(s)`}</Text>
                            </TouchableOpacity>)
                    }}
                />
            </View>
            <View style={styles.footer}>
                <ActionFooter>
                    <PrimaryActionButton title='Close' onPress={onCancel} testID={'closeDateFilterBtn'}/>
                </ActionFooter>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        backgroundColor: Colors.background,
        flex: 1,
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal:20,
        marginVertical:10,
        paddingHorizontal:20,
        paddingVertical:20,
    },
    modalInnerText: {
        color: Colors.white,
        fontSize: 22,
        textAlign: 'center',
    },
    footer:{
        flex: 1,
        maxHeight: 80,
    },
});

export default RelativeDaysModal;