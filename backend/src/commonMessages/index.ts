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
	'do you want to apply for a loan?': 'Here is the best personal loans for August 2023. <a href="https://www.forbes.com/advisor/personal-loans/best-personal-loans/" target="_blank">Reference</a>',
	'loan conditions': 'You can learn more about loan conditions on this <a href="https://www.forbes.com/advisor/personal-loans/personal-loan-requirements/" target="_blank">reference</a>.',
	'help': '<a href="https://lexartlabs.com/" target="_blank">learn more</a>'
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
