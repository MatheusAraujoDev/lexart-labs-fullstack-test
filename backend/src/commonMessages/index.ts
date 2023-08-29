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

const loansMessages: Record<string,string> = {
	'do you want to apply for a loan?': '<a href="https://lexartlabs.com/" target="_blank">Answer for option 1</a>',
	'loan conditions': '<a href="https://lexartlabs.com/" target="_blank">Answer for option 2</a>',
	'help': '<a href="https://lexartlabs.com/" target="_blank">Answer for option 3</a>'
};

export const loans = (data: IChatHistory) => {
	const text = loansMessages[data.text.toLowerCase()];

	const response: IChatHistory = {
		...data,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text,
	};

	return response;
};
