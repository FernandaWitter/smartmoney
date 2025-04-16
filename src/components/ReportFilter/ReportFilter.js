import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import RelativeDaysModal from './RelativeDaysModal';
import Icon from '@react-native-vector-icons/material-icons';
import Colors from '../../styles/colors';
import CategoryPicker from '../Core/CategoryPicker';

const ReportFilter = ({days, onChangeDays, category, onChangeCategory}) => {
    const [relativeDaysModalVisible, setRelativeDaysModalVisible] = useState(false)
    const [categoryModalVisible, setCategoryModalVisible] = useState(false)
    
    const onRelativeDaysPress = item => {
        onChangeDays(item)
        onClose()
    }

    const onClose = () => {
        setRelativeDaysModalVisible(false)
    }

    const onCatPress = item => {
        console.log('cat item')
        console.log(item)
        onChangeCategory(item)
        setCategoryModalVisible(false)
    }

    const onClearFilter = () =>{
        const item = {id: 0, color: Colors.white, description:'All categories'}
        onCatPress(item)
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.filterButton} onPress={() => { setRelativeDaysModalVisible(true)}}>
                <Text style={styles.filterButtonText}>Last {days} days</Text>
                <Icon name='keyboard-arrow-down'
                    size={20} color={Colors.champagneDark}/>
                <RelativeDaysModal isVisible={relativeDaysModalVisible}
                    onConfirm={onRelativeDaysPress}
                    onCancel={onClose}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => {setCategoryModalVisible(true)}}>
                <Text style={styles.filterButtonText}>{category}</Text>
                <Icon name='keyboard-arrow-down'
                    size={20} color={Colors.champagneDark}/>
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
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.background,
        padding: 10,
        justifyContent: 'space-around'
    },
    filterButton: {
        flexDirection: 'row',
        borderColor: Colors.champagneDark,
        borderWidth: 1,
        borderRadius: 150,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        alignItems: 'center'
    },
    filterButtonText: {
        color: Colors.champagneDark,
        textAlign: 'center',
        fontSize: 20,
    }
});

export default ReportFilter;