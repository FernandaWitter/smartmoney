import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const EntryListItem = ({entries}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Latest transactions </Text>
            <FlatList
                data={entries}
                renderItem={({item}) => (
                    <Text style={styles.entryItem}>{item.description}: ${item.amount}</Text>
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