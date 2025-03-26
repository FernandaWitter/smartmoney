import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const DATA = [{key: 'The Good Bakery: $10'},
    {key: 'Aldi: $190'},
    {key: 'One Gas Stop: $190'}
]

const EntryListItem = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Latest transactions </Text>
            <FlatList
                data={DATA}
                keyExtractor={DATA.key}
                renderItem={({item}) => (
                    <Text style={styles.entryItem}>{item.key}</Text>
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