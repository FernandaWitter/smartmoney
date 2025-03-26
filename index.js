/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Main from "./src/pages/Main"
import NewEntry from './src/pages/NewEntry/newEntry';
import Report from './src/pages/Report/Report';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Main);