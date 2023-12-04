export interface Message {
    id: number;
    text: string;
    responses: string[];
  }
  
export let messages: Message[] = [
    { id: 1, text: 'Hello, World!', responses: ['Hi!', 'Hey there!', 'Hello!'] },
    { id: 2, text: 'How are you?', responses: ['Good', 'Bad', 'Okay'] },
    { id: 3, text: 'Testing?', responses: ['Yes', 'No', 'Maybe'] },
];

export const addMessages = (newMessages: Message[]) => {
    messages = newMessages;
};
