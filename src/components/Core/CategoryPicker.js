import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import useCategories from '../../hooks/useCategories';

import ActionFooter, {PrimaryActionButton, SecondaryActionButton} from './ActionFooter';
import Colors from '../../styles/colors';

const CategoryPicker = ({modalVisible, onChangeCategory, onClose, onClearFilter}) => {
    const [categoryList] = useCategories();

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
                                return onChangeCategory(item.item);
                            }} id={(item.item.description)+'Btn'}>
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
                        <SecondaryActionButton title={'Clear filter'} onPress={onClearFilter} id={'clearFilterBtn'}/>
                    }
                    <PrimaryActionButton title={'Close'} onPress={onClose} id={'closeFilterBtn'}/>
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
    modalLabel:{
        color: Colors.white,
        fontSize: 24,
        padding: 10,
        textAlign: 'center',
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical:10,
        padding: 20,
    },
    modalItemText:{
        color: Colors.white,
        flex: 1,
        fontSize: 28,
        textAlign: 'center',
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: Colors.background,
        borderColor: Colors.red,
        borderRadius: 15,
        borderWidth: 2,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
    },
    closeButtonText:{
        color: Colors.red,
        fontSize: 22,
        textAlign: 'center',
    },
    footer:{
        flex: 1,
        maxHeight: 80,
    }
});

export default CategoryPicker;