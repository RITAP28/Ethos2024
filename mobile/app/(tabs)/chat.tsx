import { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, Text, StyleSheet, View } from 'react-native';
import { io, Socket } from 'socket.io-client';

type Message = string;
type ServerToClientEvents = {
    message: (msg: Message) => void;
};
type ClientToServerEvents = {
    message: (msg: Message) => void;
};

export default function ChatScreen() {

    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://192.168.66.213:4000');

        setSocket(newSocket);

        newSocket.on('message', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && message) {
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chat with Someone</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item}</Text>
                    </View>
                )}
                style={styles.chatList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatList: {
        flex: 1,
        marginBottom: 10,
    },
    messageContainer: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});