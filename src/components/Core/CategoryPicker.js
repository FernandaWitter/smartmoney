import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import ActionFooter, {PrimaryActionButton, SecondaryActionButton} from './ActionFooter';
import { connectToDatabase } from '../../database/DBConfig';
import { getCategories } from '../../database/services/entryService';
import { useIsFocused } from '@react-navigation/native';
import useCategories from '../../hooks/useCategories';

const CategoryPicker = ({modalVisible, onChangeCategory, onClose, onClearFilter}) => {
    const [categoryList] = useCategories()

    return(
       
        <Modal animationType='slide' transparent={false} visible={modalVisible} style={borderRadius=10}>
            <View style={styles.modal}>
                <Text style={styles.modalLabel}>Select a category</Text>
                <FlatList
                    data={categoryList}
                    renderItem={(item) => {
                        return(
                        <TouchableOpacity style={styles.modalItem}
                            onPress={() => {
                                onChangeCategory(item.item);
                            }}>
                            <Text style={[styles.modalItemText, {color: item.item.color}]}>
                                {item.item.description}
                            </Text>
                        </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={styles.footer}>
                <ActionFooter>
                {onClearFilter &&
                        <SecondaryActionButton title={'Clear filter'} onPress={onClearFilter}/>
                    }
                    <PrimaryActionButton title={'Close'} onPress={onClose}/>
                    
                </ActionFooter>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({

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
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical:10,
        marginHorizontal: 20,
        padding: 20
    },
    modalItemText:{
        flex: 1,
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.red,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        alignSelf: 'center'
    },
    closeButtonText:{
        fontSize: 22,
        color: Colors.red,
        textAlign: 'center'
    },
    footer:{
        flex: 1,
        maxHeight: 80
    }
});

export default CategoryPicker;