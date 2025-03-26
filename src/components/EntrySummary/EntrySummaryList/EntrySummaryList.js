import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const DATA = [{key: 'Food: $201'},
            {key: 'Gas: $12'},
            {key: 'Rent: $120'},
            {key: 'Leisure: $250'},
            {key: 'Others: $1200'}]

const EntrySummaryList = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList 
                data={DATA}
                keyExtractor={DATA.key}
                renderItem={({item}) => (
                    <Text style={styles.itemText}>{item.key}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,     
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    itemButton: {

  },
  itemText: {
    fontSize: 16,
  },
});

export default EntrySummaryList;