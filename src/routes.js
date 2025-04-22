import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './pages/Main/index';
import NewEntry from './pages/NewEntry/newEntry';
import Report from './pages/Report/Report';
import History from './pages/History/History';
import Welcome from './pages/Welcome/Welcome';
import Loading from './pages/Loading/Loading';

const Routes = createStaticNavigation(
    createNativeStackNavigator({
        screens: {
            Main,
            NewEntry,
            Report,
            History, 
            Welcome,
            Loading
        },
        screenOptions: {
            headerShown: false
        },
        initialRouteName: 'Loading',
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