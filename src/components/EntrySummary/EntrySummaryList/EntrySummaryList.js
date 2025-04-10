import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';



const EntrySummaryList = ({summary}) => {
    return(
        <View style={styles.container}>
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
        //flex: 1,     
    },
	itemText: {
    	fontSize: 18,
  	},
});

export default EntrySummaryList;