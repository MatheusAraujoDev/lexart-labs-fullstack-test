import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import Input from './components/Input';
import ExportData from './components/ExportData';
import { socket } from './socket';
import Swal from 'sweetalert2';

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

function App() {
	const [showCsvTab, setShowCsvTab] = useState(false);
	const [isChatFinished, setIsChatFinished] = useState(false);
	const [chatHistory, setChatHistory] = useState<IChatHistory[]>([{
		id: crypto.randomUUID(),
		date: new Date().toISOString(),
		sender: 'bot',
		step: 0,
		textType: 'text',
		text: 'Send your first message!',
		isMenu: false,
	}]);

	useEffect(() => {		
		socket.on('connect', () => {
			console.log('Connected with server socket.io');
		});

		socket.on('bot:message', (data: IChatHistory) => {
			setChatHistory((prev) => [...prev, data]);
		});

		socket.on('bot:goodbye', (data: IChatHistory) => {
			setIsChatFinished(true);
			setChatHistory((prev) => [...prev, data]);
		});

		return () => {
			socket.off('connect');
			socket.off('bot:message');
			socket.off('bot:goodbye');
		};
	}, []);

	useEffect(() => {
		if(isChatFinished) {
			socket.emit('system:save-db', {
				history: chatHistory,
				userId: chatHistory[chatHistory.length - 1].userId
			});
		}
		
	}, [chatHistory]);

	function handleMenuSubmit(value: string) {
		const data: IChatHistory = {
			id: crypto.randomUUID(),
			text: value,
			sender: 'user',
			step: chatHistory[chatHistory.length - 1].step,
			date: new Date().toISOString(),
			textType: chatHistory[chatHistory.length - 1].textType,
			userName: chatHistory[chatHistory.length - 1]?.userName,
			userId: chatHistory[chatHistory.length - 1]?.userId,
			password: chatHistory[chatHistory.length - 1]?.password,
			isMenu: false,
		};

		setChatHistory((prev) => [...prev, {
			...data,
			text: data.textType === 'password' ? data.text.replace(/./g, '*') : data.text,
		}]);

		socket.emit('user:message', data);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>, message: string) {
		event.preventDefault();

		if(message.trim() === '') {
			Swal.fire({
				text: 'Please type something!',
			});
			return;
		}

		const data: IChatHistory = {
			id: crypto.randomUUID(),
			text: message,
			sender: 'user',
			step: chatHistory[chatHistory.length - 1].step,
			date: new Date().toISOString(),
			textType: chatHistory[chatHistory.length - 1].textType,
			userName: chatHistory[chatHistory.length - 1]?.userName,
			userId: chatHistory[chatHistory.length - 1]?.userId,
			password: chatHistory[chatHistory.length - 1]?.password,
			isMenu: false,
		};

		setChatHistory((prev) => [...prev, {
			...data,
			text: data.textType === 'password' ? data.text.replace(/./g, '*') : data.text,
		}]);

		socket.emit('user:message', data);
	}

	return (
		<>
			<h1 className='chat-title'> ChatBot</h1>

			<div className='csv-button-container'>
				<button className='csv-button'
					onClick={() => {
						if(!isChatFinished) {
							Swal.fire({
								text: 'You have not finished your conversation yet! (to end it type "GoodBye")',
								position: 'center'
							});
							return;
						}

						setShowCsvTab(!showCsvTab);
					}}
				>
					{showCsvTab ? 'GO BACK' : 'EXPORT CSV'}
				</button>
			</div>

			{
				showCsvTab ? (
					<ExportData isChatFinished={isChatFinished} userId={chatHistory[chatHistory.length - 1].userId} />
				)
					: <>
						<Chat
							chatHistory={chatHistory}
							handleOptionClick={(value) => handleMenuSubmit(value)}
						/>
						<Input onSubmit={handleSubmit} textType={chatHistory[chatHistory.length - 1]?.textType} />
					</>
			}
      
		</>
	);
}

export default App;
