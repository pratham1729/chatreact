// messageTypes.ts

export interface Message {
    id: number;
    text: string;
    responses: string[]; // New property for responses
  }
  
  export const messages: Message[] = [
    { id: 1, text: 'Hello, World!', responses: ['Hi!'] },
    { id: 2, text: 'How are you?', responses: ['Im good'] },
    { id: 3, text: 'Testing?', responses: ['too bad.'] },
  ];
  