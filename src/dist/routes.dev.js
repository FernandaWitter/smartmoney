"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _native = require("@react-navigation/native");

var _nativeStack = require("@react-navigation/native-stack");

var _index = _interopRequireDefault(require("./pages/Main/index"));

var _newEntry = _interopRequireDefault(require("./pages/NewEntry/newEntry"));

var _Report = _interopRequireDefault(require("./pages/Report/Report"));

var _History = _interopRequireDefault(require("./pages/History/History"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Routes = (0, _native.createStaticNavigation)((0, _nativeStack.createNativeStackNavigator)({
  screens: {
    Main: _index["default"],
    NewEntry: _newEntry["default"],
    Report: _Report["default"],
    History: _History["default"]
  },
  screenOptions: {
    headerShown: false
  },
  initialRouteName: 'Main',
  backBehavior: 'order'
}));
/*
const RootStack = createNativeStackNavigator({
    screens: {
        Home: Main,
    },
});

const Routes = createStaticNavigation(RootStack);
*/

var _default = Routes;
exports["default"] = _default;