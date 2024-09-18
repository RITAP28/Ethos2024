import { Stack, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userExist, userNotExist } from '@/redux/reducer/userReducer';
import { fetchToken } from '@/utils/getToken';

export default function TabLayout() {
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const token = await fetchToken();

        try {
            const { data } = await axios.get("http://192.168.66.213:4000/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(userExist(data.user));
        } catch (error: any) {
            dispatch(userNotExist());
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="chat" options={{ title: 'Chat' }} />
            <Stack.Screen name="login" options={{ title: 'Login' }} />
            <Stack.Screen name="register" options={{ title: 'Register' }} />
        </Stack>
    );
}