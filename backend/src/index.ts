import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { IChatHistory, IDatabaseSaveChat, botEmitName, systemEmitSaveDb } from './commonTypes';
import { steps } from './botSteps';
import { errorAnswer } from './commonMessages';
import { prisma } from './prisma';
import path from 'path';
import { randomUUID } from 'crypto';
import { unlink, writeFile } from 'fs/promises';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-config.json';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors({
	origin: '*'
}));
const server = http.createServer(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const io = new Server(server, {
	cors: {
		origin: '*'
	}
});

io.on('connection', (socket) => {
	console.log('New user connected!');

	socket.on('user:message', (data: IChatHistory) => {
		const step = steps.find(item => item.step === data.step);

		if(!step) {
			socket.emit(botEmitName, errorAnswer(data));
			return;
		}

		step.handleStep(data, socket);
	});

	socket.on(systemEmitSaveDb, async (data: IDatabaseSaveChat) => {
		await prisma.chatHistory.create({
			data: {
				history: JSON.stringify(data.history),
				userId: data.userId,
			}
		});
	});
});

// export All CSV
app.get('/exportCSV/:historyId', async (req, res) => {
	const result = await prisma.chatHistory.findFirst({
		where: {
			id: req.params.historyId,
		},
		include: {
			user: true,
		}
	});

	if(!result) {
		return res.status(404).json('Chat History Not Found!');
	}

	const filePath = path.resolve(`src/temp/${randomUUID()}.csv`);
	
	await writeFile(filePath,'message;sender;date\n', {
		flag: 'a+'
	});

	const history: IChatHistory[] = JSON.parse(result.history);

	for (let index = 0; index < history.length; index++) {
		const text = `${history[index].text};${history[index].sender};${history[index].date}\n`;
		const menu = `menu:${history[index].menuTitle};${history[index].sender};${history[index].date}\n`;
		
		await writeFile(filePath, history[index].text ? text : menu, {
			flag: 'a+'
		});
	}

	res.setHeader('Content-Type', 'text/csv');
	res.on('finish', async () => {
		await unlink(filePath);
	});

	return res.status(200).sendFile(filePath);
});


// get All chat histories by userId
app.get('/chatHistory/:userId', async (req, res) => {
	const result = await prisma.chatHistory.findMany({
		where: {
			userId: req.params.userId,
		},
		select: {
			id: true,
			createdAt: true,
			user: {
				select: {
					userName: true,
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return res.status(200).json(result);
});

server.listen(PORT, () => console.log(`Server running on ${PORT} 🚀`));
