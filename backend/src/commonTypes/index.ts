export interface IChatHistory {
	id: string,
	text: string;
	textType: 'text' | 'password',
	sender: 'user' | 'bot';
	date: string;
	step: number;
	userName?: string;
	userId?: string;
	password?: string;
	isMenu?: boolean;
	menuTitle?: string;
	menuOptions?: Array<string>;
}

export const botEmitName = 'bot:message';
export const botEmitGoodBye = 'bot:goodbye';
export const systemEmitSaveDb = 'system:save-db';
