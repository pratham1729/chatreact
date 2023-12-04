import React, { useState } from 'react';
import { MessageBox } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import  MessageInput from './MessageInput';
import { chats, Message, addmessage } from './messageTypes';

interface ChatProps {
  id: number
}
const Chat: React.FC<ChatProps> = ({id}) => {
  var messages=chats[id].messages;
  var chatTitle=chats[id].title;
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: Message = {
        type: 'text',
        text: newMessage,
        position: 'right',
        title: 'User',
        titleColor: 'green',
    };
      addmessage([...messages, message], id);
      setNewMessage('');
    }
  };
  const handleSetNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  return (
      <div>
      <h1>{chatTitle}</h1>
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          position={message.position}
          type={message.type}
          text={message.text}
          title={message.title}
          titleColor={message.titleColor}
          />
      ))}
      <MessageInput
        value={newMessage}
        onChange={handleSetNewMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
};
   

export default Chat;
