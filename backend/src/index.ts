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

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*'
	}
});

app.use(cors());
app.use(express.json());

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
		await writeFile(filePath, `${history[index].text};${history[index].sender};${history[index].date}\n`, {
			flag: 'a+'
		});
	}

	res.setHeader('Content-Disposition', `attachment; filename=Conversation ${result.user.userName} - ${result.createdAt.toISOString()}.csv`);
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
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return res.status(200).json(result);
});

server.listen(PORT, () => console.log(`Server running on ${PORT} 🚀`));
