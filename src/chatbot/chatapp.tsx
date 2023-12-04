import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css';
import Chat from './chat';
import { chats } from './messageTypes';
import { ChatItem } from 'react-chat-elements';

const ChatApp: React.FC = () => {
    const [key, setKey] = useState<number>(chats.length-1);
    console.log(chats);
    
    return (
        <div>
        {chats.map((chat, index) => (
            <ChatItem
              key={chat.id}
              title={chat.title}
              onClick={() => setKey(chat.id)}
            />
        ))}
        <Chat id={key} />
        </div>
    )
};

export default ChatApp;