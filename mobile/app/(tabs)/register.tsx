import { userExist, userNotExist } from '@/redux/reducer/userReducer';
import axios from 'axios';
import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleRegister = async () => {

        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post("http://192.168.66.213:4000/api/v1/user/register", { name, email, password });
            dispatch(userExist(data.user));
            await AsyncStorage.setItem('authToken', data.token);
            router.push("/" as Href);
        } catch (error: any) {
            dispatch(userNotExist());
            Alert.alert(error.response.data.message)
        }

        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ paddingBottom: 20, fontSize: 20 }}>{loading ? "loading..." : "Register"}</Text>
            <TextInput
                placeholder="Name"
                onChangeText={setName}
                value={name}
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 10 }}
            />
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 10 }}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 10 }}
            />
            <Button disabled={loading} title="Register" onPress={handleRegister} />
            <Text style={{ marginTop: 30 }} onPress={() => router.push("/login" as Href)}>Login</Text>
        </SafeAreaView>
    )
}

export default RegisterScreen;