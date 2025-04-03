import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';



const EntrySummaryList = ({summary}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList 
                data={summary}
                renderItem={({item}) => (
                    <Text style={styles.itemText}>{item.description}: ${item.amount}</Text>
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