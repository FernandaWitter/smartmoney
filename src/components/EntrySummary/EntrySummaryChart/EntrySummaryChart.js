import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const EntrySummaryChart = ({categorySummary = []}) => {

    const getPieChartData = (data) => {
        return data.map((item, index) => {
            return {
                key: index,
                value: item.amount,
                svg: { fill: item.color },
            };
        });
    };

    const pieChartData = getPieChartData(categorySummary)

    return(
        <View style={styles.container}>
            <PieChart
                style={styles.chart}
                data={pieChartData}
                testID='expendituresChart'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    chart: {
        height: 135,
        marginRight: 10,
        width: 135,
    }
});

export default EntrySummaryChart;