import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { missingAnswer } from '../commonMessages';
import { IChatHistory, botEmitName } from '../commonTypes';

export const handleStepZero = (data: IChatHistory, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
			
	const messagesToStartConversation = ['Hello', 'Goodbye', 'Good', 'I want'];

	const response: IChatHistory = {
		...data,
		step: data.step + 1,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text: 'Hello, to continue please sign in typing your username and password!',
	};

	for (let index = 0; index < messagesToStartConversation.length; index++) {
		if(data.text.includes(messagesToStartConversation[index])) {
			socket.emit(botEmitName, response);
			console.log('response', response);
			return;
		}
	}

	socket.emit(botEmitName, missingAnswer(data));
};
