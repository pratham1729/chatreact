import React, { useState } from 'react';
import { MessageList } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import  MessageInput from './MessageInput';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { position: 'right', type: 'text', text: newMessage },
        { position: 'left', type: 'text', text: newMessage }

      ]);
      setNewMessage('');
    }
  };
  const handleSetNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  return (
      <div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={messages}
        />
      <MessageInput
        value={newMessage}
        onChange={handleSetNewMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
};
   

export default ChatApp;
