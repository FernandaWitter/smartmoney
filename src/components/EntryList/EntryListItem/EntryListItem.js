import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../../../styles/colors';
import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from '@react-native-vector-icons/material-icons';

const EntryListItem = ({entry, isFirstItem, isLastItem}) => {
  const navigation = useNavigation();
  const bulletLineY = isFirstItem ? 20 : 0;
  const bulletLineHeight = isLastItem ? 30 : 50;
  const showBulletLine = !(isFirstItem && isLastItem);

  const getDate = (timestamp) => {
    return new Date(timestamp);
  }

  console.log(entry)

  return(
    <View>
      <TouchableOpacity
        onPress={() =>{
          navigation.navigate('NewEntry', {entryID: entry.id})
          }}>
        <View style={styles.primaryItemContainer}>
          {showBulletLine && 
            <Svg height='50' width='30'>
              <Rect x='9' y={bulletLineY} width='1.5' height={bulletLineHeight} fill={Colors.background} />
              <Circle cx='10' cy='25' r='8'
                stroke={Colors.background}
                strokeWidth='1.5'
                fill={entry.color}/>
            </Svg>
          }
          <View style={styles.primaryItemValueContainer}>
            <Text style={styles.primaryItemValue}>{entry.description}</Text>

            <View style={styles.secondaryItemContainer}>
              <Icon name='access-time' style={styles.secondaryItemValueIcon} />        
              <Text style={styles.secondaryItemValue}>{getDate(entry.updateDate).toString()}</Text>
            </View>

            {entry.address &&
              <View style={styles.secondaryItemContainer}>
                <Icon name='person-pin' style={styles.secondaryItemValueIcon} />
                <Text style={styles.secondaryItemValue}>Address</Text>
              </View>
            }
                
            </View>
            <View>
              <Text style={styles.primaryItemValue}>${entry.amount}</Text>
              </View>
            </View>
                
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryItemContainer:{
      flex: 1,
      flexDirection:'row'
  },
  primaryItemValueContainer:{
      flexGrow: 1,

  },
  primaryItemValue:{
      fontSize:20,
      color: Colors.white,
      marginTop: 5,
  },
  secondaryItemContainer: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  secondaryItemValueIcon:{
    flexGrow: 0,
    fontSize: 15,
    color: Colors.metal,
    marginTop: 2,
    marginRight: 2,
  },
  secondaryItemValue: {
    flexGrow: 0,
    fontSize: 14,
    color: Colors.metal,
    marginRight: 10,
  }
});

export default EntryListItem;