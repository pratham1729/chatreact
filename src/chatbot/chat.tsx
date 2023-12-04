import React, { useState } from 'react';
import { Message, messages,addMessages } from './messageTypes'; // Import from the messageTypes file
import './chat.css';

const ChatApp: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [previousMessage, setpreviousMessage] = useState<Message | null>(null);

  const handleSendMessage = () => {
    console.log('newMessage', newMessage);
    if (newMessage.trim() !== '') {
        //get the latest id from the messages array
        const latestId = messages[messages.length - 1].id;
        const message: Message = {
            id:  latestId + 1,
            text: newMessage,
            responses: []
        };
        // add the new message to the messages array
        addMessages([...messages, message]);
        // default the new message to null
        setNewMessage('');
    }
  };

  return (
    <div className="ChatApp">
      <div className="ChatApp-messages">
        {messages.map((message) => (
          <div key={message.id} className="ChatApp-message">
            {message.text}  
            <br/>
            {message.responses[0]}
          </div>
        ))}
      </div>
      <div className="ChatApp-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message and press Enter..."
          className="ChatApp-input"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="ChatApp-button">
          Send
        </button>
      </div>
      {previousMessage && (
        <div className="ChatApp-selected-message">
          <p>{previousMessage.text}</p>
          <p>Responses:</p>
          <ul>
            {previousMessage.responses.map((response, index) => (
              <li key={index}>{response}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
