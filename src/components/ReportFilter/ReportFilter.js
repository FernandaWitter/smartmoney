import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

import RelativeDaysModal from './RelativeDaysModal';
import CategoryPicker from '../Core/CategoryPicker';
import Colors from '../../styles/colors';

const ReportFilter = ({days, onChangeDays, category, onChangeCategory}) => {
    const [relativeDaysModalVisible, setRelativeDaysModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    
    const onRelativeDaysPress = item => {
        onChangeDays(item);
        onClose();
    };

    const onClose = () => {
        setRelativeDaysModalVisible(false);
    };

    const onCatPress = item => {
        onChangeCategory(item);
        setCategoryModalVisible(false);
    };

    const onClearFilter = () =>{
        const item = {id: 0, color: Colors.white, description:'All categories'};
        onCatPress(item);
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.filterButton} id='relativeDaysFilterSelect'
                onPress={() => { setRelativeDaysModalVisible(true)}}>
                <Text style={styles.filterButtonText}>Last {days} day(s)</Text>
                <Icon name='keyboard-arrow-down' size={20} color={Colors.champagneDark}/>
                <RelativeDaysModal isVisible={relativeDaysModalVisible}
                    onConfirm={onRelativeDaysPress}
                    onCancel={onClose}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} id='categoryFilterSelect'
                onPress={() => {setCategoryModalVisible(true)}}>
                <Text style={styles.filterButtonText}>{category}</Text>
                <Icon name='keyboard-arrow-down' size={20} color={Colors.champagneDark}/>
                <CategoryPicker 
                        modalVisible={categoryModalVisible}
                        onChangeCategory={onCatPress}
                        onClose={() => setCategoryModalVisible(false)}
                        onClearFilter={onClearFilter} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    filterButton: {
        alignItems: 'center',
        borderColor: Colors.champagneDark,
        borderRadius: 150,
        borderWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    filterButtonText: {
        color: Colors.champagneDark,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ReportFilter;