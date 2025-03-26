import Reactotron from 'reactotron-react-native';

Reactotron.configure() // controls connection and communication
    .useReactNative() // add all built-in react native resources
    .connect(); // let's connect!