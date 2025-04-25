import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './pages/Main/index';
import NewEntry from './pages/NewEntry/newEntry';
import Report from './pages/Report/Report';
import History from './pages/History/History';
import Welcome from './pages/Welcome/Welcome';
import Loading from './pages/Loading/Loading';
import Reset from './pages/Reset/Reset';

const Routes = createStaticNavigation(
    createNativeStackNavigator({
        screens: {
            Main,
            NewEntry,
            Report,
            History,
            Welcome,
            Loading,
            Reset
        },
        screenOptions: {
            headerShown: false
        },
        initialRouteName: 'Loading',
        backBehavior: 'order'
    })
);

export default Routes;