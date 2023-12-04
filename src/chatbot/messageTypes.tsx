export interface Message {
    type: string;
    text: string;
    position: string;
  }
  
export let messages: Message[] = [
    { type:'text', text: 'Hello, World!', position: 'left'},
    { type:'text', text: 'How are you?', position: 'right'},
    { type:'text', text: 'Testing?', position: 'left'},
];
