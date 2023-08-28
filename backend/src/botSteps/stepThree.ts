import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IChatHistory, botEmitGoodBye, botEmitName } from '../commonTypes';
import { loans, missingAnswer } from '../commonMessages';

export const handleStepThree = async (data: IChatHistory, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

	const textHaveGoodbye = data.text.toLocaleLowerCase().includes('goodbye');
	const textHaveLoan = data.text.toLocaleLowerCase().includes('loan');
	const menuOptions = ['Do you want to apply for a loan?', 'Loan conditions', 'Help'];

	if(textHaveGoodbye) {
		const response: IChatHistory = {
			step: 0,
			id: randomUUID(),
			date: new Date().toISOString(),
			sender: 'bot',
			text: 'You have left the chat, if you want to export your conversation click on the top right button "export CSV"!',
			userName: undefined,
			password: undefined,
			textType: 'text',
			isMenu: false,
			menuOptions: undefined,
			menuTitle: undefined,
			userId: data.userId,
		};

		socket.emit(botEmitGoodBye, response);
		return;
	}

	if(menuOptions.includes(data.text)) {
		const response = loans(data);
		socket.emit(botEmitName, response);
		return;
	}

	if(textHaveLoan) {
		const response: IChatHistory = {
			...data,
			step: data.step,
			id: randomUUID(),
			date: new Date().toISOString(),
			sender: 'bot',
			text: '',
			textType: 'text',
			isMenu: true,
			menuOptions,
			menuTitle: 'Choose an option',
		};

		socket.emit(botEmitName, response);
		return;
	}

	const response = missingAnswer(data);
  
	socket.emit(botEmitName, response);
};
