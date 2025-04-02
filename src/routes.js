import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './pages/Main/index';
import NewEntry from './pages/NewEntry/newEntry';
import Report from './pages/Report/Report';

const Routes = createStaticNavigation(
    createNativeStackNavigator({
        screens: {
            Main,
            NewEntry,
            Report
        },
        screenOptions: {
            headerShown: false
        },
        initialRouteName: 'Main',
        backBehavior: 'order'
    })
);

/*
const RootStack = createNativeStackNavigator({
    screens: {
        Home: Main,
    },
});

const Routes = createStaticNavigation(RootStack);
*/
export default Routes;