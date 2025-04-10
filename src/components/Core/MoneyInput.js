import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Colors from '../../styles/colors';

const MoneyInput = ({value, onChangeValue, label}) => {
    return(
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInputMask
                style={styles.input}
                type={'money'}
                options={{
                    precision: 2,
                    separator: '.',
                    delimiter: ',',
                    unit:'$',
                    suffixUnit:''
                }}
                value={value}
                includeRawValueInChangeText={true}
                onChangeText={(maskedValue, rawValue) => {onChangeValue(rawValue)}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    label:{
        fontSize:24,
        color: Colors.white,
        textAlign: 'center',
    },
    input: {
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10
    }
})

export default MoneyInput;