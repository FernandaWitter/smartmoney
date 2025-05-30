import AsyncStorage from "@react-native-async-storage/async-storage";

export const isInitialized = async() => {
    const openingBalance = await AsyncStorage.getItem('openingBalance');
    return openingBalance !== null && openingBalance === 'true';
};

export const setInitialized = async() => {
    await AsyncStorage.setItem('openingBalance', 'true');
};

export const clearInitialized = async() => {
    await AsyncStorage.clear();
};