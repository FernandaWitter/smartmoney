import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel/BalancePanel';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { clearDatabase, connectToDatabase, createTables } from '../../database/DBConfig';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { getEntries, getLatestEntries } from '../../database/services/entryService';
import useEntries from '../../hooks/useEntries';

const Main = () => {    
  const [entries] = useEntries('','',5)

      return (
        <View style={styles.container}>
            <BalancePanel/>
            <EntrySummary/>
            {entries &&
            <EntryList entryList={entries} showMore={true}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background,
    }, 
    title: {
        fontSize: 20,
    },
});

export default Main;
