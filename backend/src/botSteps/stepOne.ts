import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IChatHistory, botEmitName } from '../commonTypes';

export const handleStepOne = (data: IChatHistory, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

	if(data.text.length < 3) {
		socket.emit(botEmitName, {
			...data,
			id: randomUUID(),
			date: new Date().toISOString(),
			sender: 'bot',
			text: 'Please type a username with 3 or more characters!',
		});

		return;
	}

	const response: IChatHistory = {
		...data,
		step: data.step + 1,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text: 'Please type your password!',
		userName: data.text,
		textType: 'password'
	};

	socket.emit(botEmitName, response);
};
