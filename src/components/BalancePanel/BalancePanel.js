import React from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/material-icons';

import useBalance from '../../hooks/useBalance';

import Colors from '../../styles/colors';
import BalancePanelLabel from './BalancePanelLabel/BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart/BalancePanelChart';
import useBalanceSumByDate from '../../hooks/useBalanceSumByDate';

const BalancePanel = () => {
	const navigation = useNavigation();
    const [balance] = useBalance();
	const [balanceSum] = useBalanceSumByDate(7);

	return(
    	<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor={Colors.violet} />
        	<LinearGradient colors={[Colors.violet, Colors.blue]}
            	style={styles.panel}>
            	<BalancePanelLabel currBalance={balance}/>
				{balanceSum.length > 0 &&
            		<BalancePanelChart balanceSum={balanceSum}/>
				}
          	</LinearGradient>
          	<TouchableOpacity onPress={() => {navigation.navigate('NewEntry')}}
            	style={styles.button} testID='addEntryBtn'>
            	<Icon name='add' size={30} color={Colors.white}/>
          	</TouchableOpacity>
        </View>
    );
};

export const styles = StyleSheet.create({
	container: {
    	flex: 1,
		flexShrink: 1,
		marginBottom: -23,
		maxHeight:180,
  	},
  	panel:{
    	flex: 1,
  	},
  	button:{
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor:Colors.green,
		borderRadius: 150,
		elevation: 5,
		height: 50,
		justifyContent:'center',
		marginTop: -25,
		marginRight: 10,
		shadowColor: Colors.black,
		width: 50,
		zIndex:100000000,    
  	},
});

export default BalancePanel;