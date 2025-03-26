import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker'

const ReportFilter = () => {
    return(
        <View>
            <Picker>
                <Picker.Item label="All categories"/>
            </Picker>
            <Picker>
                <Picker.Item label="Last 7 days"/>
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ReportFilter;