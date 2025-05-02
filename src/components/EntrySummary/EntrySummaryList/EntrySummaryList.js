import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import Colors from '../../../styles/colors';

const EntrySummaryList = ({summary}) => {
    return(
        <View style={styles.container}>
            <FlatList 
                testID='categorySummaryList'
                data={summary}
                renderItem={({item}) => (
                    (<View style>
                        <View style={styles.primaryItemContainer}>
                            <Svg height='30' width='30'>
                                <Circle cx='10' cy='15' r='7'
                                    stroke={Colors.background}
                                    strokeWidth='1.5'
                                    fill={item.color}/>
                            </Svg>
                            <View style={styles.primaryItemValueContainer}>
                                <Text style={styles.primaryItemValue}>{item.description}: $ {(item.amount).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>)
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: Colors.asphalt,
        flex: 1,
    },
    primaryItemContainer:{
        flex: 1,
        flexDirection:'row',
    },
    primaryItemValueContainer:{
        flexGrow: 1,
    },
    primaryItemValue:{
        fontSize:20,
        color: Colors.white,
    },
});

export default EntrySummaryList;