import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import EntrySummary from '../../components/EntrySummary/EntrySummary';
import EntryList from '../../components/EntryList/EntryList';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../../styles/colors';
import ActionFooter, { PrimaryActionButton } from '../../components/Core/ActionFooter';
import { connectToDatabase } from '../../database/DBConfig';
import { getEntries } from '../../database/services/entryService';

const Report = () => {
    const [entries, setEntries] = useState([])
    const [days, setDays] = useState(7)
    const [category, setCategory] = useState({description: 'Select category'})

    const loadData = useCallback(async () => {
       try {
         const db = await connectToDatabase()

         const entries = await getEntries(db, days)
         if(entries.length > 0){setEntries(entries)}
       
       } catch (error) {
         console.error(error)
       }
     }, [])
   
     const isFocused = useIsFocused();
     
     useEffect(() => {
       loadData();
     }, [isFocused])

    const onChangeDay = async item => {
      const db = await connectToDatabase()
      const entries = await getEntries(db, item, category.id)
      
      setDays(item)
      setEntries(entries)
    }

    const onChangeCategory = async item => {
      const db = await connectToDatabase()
      const entries = await getEntries(db, days, item.id)
 
      setCategory(item)
      setEntries(entries)     
    }

    return(
        <View style={styles.container}>
                <BalanceLabel/>
                <ReportFilter days={days} onChangeDays={onChangeDay}
                    category={category.description} onChangeCategory={onChangeCategory}
                />
                <ScrollView  nestedScrollEnabled={true} >                  
                        <View style={styles.container}>
                            <EntrySummary/>
                            {entries &&
                            <EntryList entryList={entries} showMore={false}/>                        
                            }
                        </View>
                </ScrollView>
                <View style={styles.footer}>
            <ActionFooter>
                <PrimaryActionButton title='Save'/>
            </ActionFooter>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
        backgroundColor: Colors.background
    },
    footer:{
        flex: 1,
        flexGrow: 1,
        maxHeight: 80,
        minHeight: 80
    }
});

export default Report;