import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AreaChart } from 'react-native-svg-charts'

import useBalanceSumByDate from '../../../hooks/useBalanceSumByDate';

const BalancePanelChart = () => {
    const [balanceSum] = useBalanceSumByDate();
    return(
        <View style={styles.container}>
            <AreaChart
                style={styles.chart}
                data={balanceSum}
                svg={{fill: 'rgba(0,0,0, .1)',
                    stroke: 'rgba(0,0,0, .1)',
                    strokeWidth: 1}}
                contentInset={{top: 0, bottom: 0}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginTop: -20,
        paddingHorizontal: 20,        
    },
    chart: {
        height: 60
    }
});

export default BalancePanelChart;