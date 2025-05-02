import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../../styles/colors';

const EntryListItem = ({entry, isFirstItem, isLastItem}) => {
  	const navigation = useNavigation();
	const bulletLineY = isFirstItem ? 20 : 0;
	const bulletLineHeight = isLastItem ? 30 : 50;
	const showBulletLine = !(isFirstItem && isLastItem);

	return(
		<View>
			<TouchableOpacity id={(entry.description).replace(' ', '')+'Btn'}
				onPress={() =>{
				navigation.navigate('NewEntry', {entryID: entry.id});
			}}>
				<View style={styles.primaryItemContainer}>
					<Svg height='50' width='30'>
					{showBulletLine &&
						<Rect x='9' y={bulletLineY} width='1.5' height={bulletLineHeight} 
						fill={Colors.background} />
					}
					<Circle cx='10' cy='25' r='8'
						stroke={Colors.background}
						strokeWidth='1.5'
						fill={entry.color}/>
					</Svg>
					
					<View style={styles.primaryItemValueContainer}>
						<Text style={styles.primaryItemValue}>{entry.description}</Text>
						<View style={styles.secondaryItemContainer}>
							<Icon name='access-time' style={styles.secondaryItemValueIcon} />        
						<Text style={styles.secondaryItemValue}>{entry.date}</Text>
					</View>

					{entry.address &&
						<View style={styles.secondaryItemContainer}>
							<Icon name='location-pin' style={styles.secondaryItemValueIcon} />
							<Text style={styles.secondaryItemValue}>{entry.address}</Text>
						</View>
					}
					</View>
					<View>
						<Text style={styles.primaryItemValue}>$ {(entry.amount).toFixed(2)}</Text>
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
		color: Colors.white,
		fontSize:20,
		marginTop: 5,
	},
	secondaryItemContainer: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	secondaryItemValueIcon:{
		color: Colors.metal,
		flexGrow: 0,
		fontSize: 15,
		marginRight: 2,
		marginTop: 2,
	},
	secondaryItemValue: {
		color: Colors.metal,
		flexGrow: 0,
		fontSize: 14,
		marginRight: 10,
	}
});

export default EntryListItem;