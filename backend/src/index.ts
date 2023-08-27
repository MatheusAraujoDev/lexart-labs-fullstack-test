import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { IChatHistory, botEmitName } from './commonTypes';
import { steps } from './botSteps';
import { errorAnswer } from './commonMessages';

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*'
	}
});

app.use(cors());
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
});

server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
