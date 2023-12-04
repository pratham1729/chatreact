export interface Message {
    type: string;
    text: string;
    position: string;
    title?: string;
    titleColor?: string;
  }

export interface Chat {
    id: number;
    title: string;
    messages: Message[];
  }

export let chats: Chat[] = [
  { id:0,
    title: 'Chat 1',
    messages: [
    { type:'text', text: 'Hello, World!', position: 'left', title: 'Bot', titleColor:'blue'},
    { type:'text', text: 'How are you?', position: 'right', title: 'Bot', titleColor:'blue'},
    { type:'text', text: 'Testing?', position: 'left', title: 'Bot', titleColor:'blue'}
]}
];

export const addmessage = (newMessages: Message[], id: number) => {
  chats[id].messages=newMessages;
}