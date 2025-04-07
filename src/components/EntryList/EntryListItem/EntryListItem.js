import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const EntryListItem = ({entries}) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Latest transactions </Text>
            <FlatList
                data={entries}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() =>{
                            navigation.navigate('NewEntry', {entryID: item.id})
                    }}>
                        <Text>{item.description}: ${item.amount}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    entryItem:{
        fontSize: 16,
    }
});

export default EntryListItem;