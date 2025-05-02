import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AreaChart } from 'react-native-svg-charts'

const BalancePanelChart = (balanceSum) => {

    return(
        <View style={styles.container}>
            {balanceSum.balanceSum.length > 0 &&
            <AreaChart
                style={styles.chart}
                data={balanceSum.balanceSum}
                svg={{fill: 'rgba(0,0,0, .1)',
                    stroke: 'rgba(0,0,0, .1)',
                    strokeWidth: 1}}
                contentInset={{top: 0, bottom: 0}}
                testID='balancePanelChart'
            />
            }
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