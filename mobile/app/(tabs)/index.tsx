import { RootState } from '@/redux/store';
import { fetchToken } from '@/utils/getToken';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, View, Alert, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userNotExist } from '@/redux/reducer/userReducer';

export default function HomeScreen() {

    const router = useRouter();

    const handleLogout = async () => {

        const token = await fetchToken();
        if (!token) {
            Alert.alert("No token found. Please log in.")
            return;
        }

        try {
            await AsyncStorage.removeItem('authToken');
            dispatch(userNotExist());
        } catch (error) {
            Alert.alert("Logout failed")
        }
    }

    const [people, setPeople] = useState([
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
        { id: '4', name: 'David' },
    ]);

    const dispatch = useDispatch();

    const { user, loading } = useSelector(
        (state: RootState) => state.userReducer
    );

    if (!loading && !user) {
        router.push("/login" as Href);
    }

    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.name)}>
            <Text style={styles.chatText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleChatPress = (personName: string) => {
        router.push("/chat" as Href);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
            <View style={styles.separator} />
            <FlatList
                data={people}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <Button title='Logout' onPress={handleLogout} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    chatItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    chatText: {
        fontSize: 18,
    },
});