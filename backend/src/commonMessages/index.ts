import { randomUUID } from 'crypto';
import { IChatHistory } from '../commonTypes';

export const missingAnswer = (data: IChatHistory) => {
	const response: IChatHistory = {
		...data,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text: 'Sorry, I did not understand your message!',
	};

	return response;
};

export const errorAnswer = (data: IChatHistory) => {
	const response: IChatHistory = {
		...data,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text: 'Something went wrong, Please try again!',
	};

	return response;
};
