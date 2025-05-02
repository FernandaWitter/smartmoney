import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import Colors from '../../styles/colors';

const MoneyInput = ({value, onChangeValue, label, style}) => {

    return(
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInputMask
                style={[styles.input, style]}
                type={'money'}
                testID='amountInput'
                options={{
                    precision: 2,
                    separator: '.',
                    delimiter: ',',
                    unit:'$',
                    suffixUnit:''
                }}
                value={value}
                includeRawValueInChangeText={true}
                onChangeText={(maskedValue, rawValue) => {
                    onChangeValue(rawValue)}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label:{
        color: Colors.white,
        fontSize:24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        color: Colors.white,
        fontSize: 28,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: 'center',
    },
    errorMessage:{
        alignSelf: 'center',
        color: Colors.red,
        fontSize: 18,
        marginBottom: 15,
    },
});

export default MoneyInput;