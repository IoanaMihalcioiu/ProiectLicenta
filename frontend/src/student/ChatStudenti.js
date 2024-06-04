import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../admin/Chat.css';

function ChatStudenti() {
    const [name] = useState('Student'); // Stocăm numele utilizatorului curent
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8082/admin/chat/messages', { withCredentials: true });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        
        try {
            await axios.post('http://localhost:8082/admin/chat/messages', {
                name,
                message: newMessage
            }, { withCredentials: true });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`message ${msg.name === name ? 'my-message' : 'other-message'}`}
                    >
                        <strong>{msg.name}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="new-message-container">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatStudenti;
