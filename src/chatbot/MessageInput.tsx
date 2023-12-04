import React from 'react';
import { Input, Button } from 'react-chat-elements';

interface MessageInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
  }

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
    const rightButtons = [
        <Button
          key="sendButton"
          text="Send"
          color="white"
          backgroundColor="#4caf50"
          onClick={onSend}
        />,
      ];
  return (
    <Input
      maxHeight={100}
      placeholder="Type your message..."
      multiline={true}
      onChange={onChange}
      value={value}
      rightButtons={rightButtons}
    />
  );
};

export default MessageInput;