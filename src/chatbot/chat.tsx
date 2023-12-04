import React, { useState } from 'react';
import { MessageBox } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import  MessageInput from './MessageInput';
import { chats, Message, addmessage } from './messageTypes';

interface ChatProps {
  id: number
}

interface TransactionParams {
  from: string;
  to: string;
  value: string;
  gasLimit: string;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
}

const Chat: React.FC<ChatProps> = ({id}) => {
  var messages=chats[id].messages;
  var chatTitle=chats[id].title;
  const [newMessage, setNewMessage] = useState<string>('');

  //------------------------------------------------------
  const [accounts, setAccounts] = useState<string[]>([]);
  const handleSendEth = async () => {

    const userAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setAccounts(userAccounts);

      if (accounts.length === 0) {
        await getAccount();
      }
      if (accounts.length > 0) {
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: '0xaAc1CDC2b529073aA36912950c2079B05542F042',
              value: '0x2386f26fc10000',
              gasLimit: '0x5028',
              maxPriorityFeePerGas: '0x3b9aca00',
              maxFeePerGas: '0x2540be400',
            },
          ],
        });
        console.log(txHash);
      }
  };

  const getAccount = async () => {
    try {

    } catch (error) {
      console.error(error);
    }
  };
  //------------------------------------------------------

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: Message = {
        type: 'text',
        text: newMessage,
        position: 'right',
        title: 'User',
        titleColor: 'green',
    };
      if (newMessage.trim() === 'execute') {
        handleSendEth();
      }
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
