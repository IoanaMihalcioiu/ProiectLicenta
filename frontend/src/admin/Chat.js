import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Chat.css';

function Chat() {
    const [name] = useState('Admin'); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState('');

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
            const response = await axios.post('http://localhost:8082/admin/chat/messages', {
                name,
                message: newMessage
            }, { withCredentials: true });

            if (response.status === 201) {
                setNewMessage('');
                fetchMessages();
                setError('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response && error.response.status === 400) {
                setError('Message contains inappropriate content');
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`message ${msg.name.toLowerCase() === name.toLowerCase() ? 'my-message' : 'other-message'}`}
                    >
                        <strong>{msg.name}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="new-message-container">
                <input
                    type="text"
                    placeholder="Adreseaza intrebarea ta..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Chat;
