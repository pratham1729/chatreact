import React, { useState } from 'react';
import { Message, messages } from './messageTypes'; // Import from the messageTypes file
import './chat.css';

const ChatApp: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = messages.find((msg) => msg.id === parseInt(newMessage, 10));
      setSelectedMessage(message || null);
      setNewMessage('');
    }
    // logic here to handle the message
  };

  return (
    <div className="ChatApp">
      <div className="ChatApp-messages">
        {messages.map((message) => (
          <div key={message.id} className="ChatApp-message">
            {message.responses[0]}
          </div>
        ))}
      </div>
      <div className="ChatApp-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message ID and press Enter..."
          className="ChatApp-input"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="ChatApp-button">
          Send
        </button>
      </div>
      {selectedMessage && (
        <div className="ChatApp-selected-message">
          <p>{selectedMessage.text}</p>
          <p>Responses:</p>
          <ul>
            {selectedMessage.responses.map((response, index) => (
              <li key={index}>{response}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
