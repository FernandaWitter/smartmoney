import React from 'react';
import {View, StyleSheet} from 'react-native';

import EntryListItem from './EntryListItem/EntryListItem';

const EntryList = () => {
    return(
        <View style={styles.container}>
            <EntryListItem/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10
    }
});

export default EntryList;