import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
            return token;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
    return null;
};