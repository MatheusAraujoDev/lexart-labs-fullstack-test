import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IChatHistory, botEmitName } from '../commonTypes';
import { compare, hash } from 'bcrypt';
import { prisma } from '../prisma';

export const handleStepTwo = async (data: IChatHistory, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

	if(data.text.length < 3) {
		socket.emit(botEmitName, {
			...data,
			id: randomUUID(),
			date: new Date().toISOString(),
			sender: 'bot',
			text: 'Please type a password with 3 or more characters!',
		});

		return;
	}

	const user = await prisma.user.findFirst({
		where: {
			userName: data.userName,
		}
	});

	if(user) {
		const checkPassword = await compare(data.text, user.password);
		if(!checkPassword) {
			socket.emit(botEmitName, {
				...data,
				id: randomUUID(),
				date: new Date().toISOString(),
				sender: 'bot',
				text: 'Wrong password, please try again!',
			});

			return;
		}

		data.userId = user.id;
	} else {
		const hashPassword = await hash(data.text, 10);
		const user = await prisma.user.create({
			data: {
				userName: data.userName!,
				password: hashPassword,
			}
		});

		data.userId = user.id;
	}
  
	const response: IChatHistory = {
		...data,
		step: data.step + 1,
		id: randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		text: 'You are ready to continue. Type something like "loan" to get help about it, or "Goodbye" to quit conversation!',
		userName: data.userName,
		textType: 'text',
	};
  
	socket.emit(botEmitName, response);
};
