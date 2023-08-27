import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import Input from './components/Input';
import ExportData from './components/ExportData';
import { socket } from './socket';

export interface IChatHistory {
	id: string,
	text: string;
	textType: 'text' | 'password',
	sender: 'user' | 'bot';
	date: string;
	step: number;
	userName?: string;
	password?: string;
	isMenu: boolean;
	menuTitle?: string;
	menuOptions?: Array<string>;
}

function App() {
	const [showCsvTab, setShowCsvTab] = useState(false);
	const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected with server socket.io');
		});

		socket.on('bot:message', (data: IChatHistory) => {
			setChatHistory((prev) => [...prev, data]);
		});

		return () => {
			socket.off('connect');
			socket.off('bot:message');
		};
	}, []);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>, message: string) {
		event.preventDefault();

		if(message.trim() === '') {
			alert('Escreve algo!');
			return;
		}

		const data: IChatHistory = chatHistory.length ?
			{
				id: crypto.randomUUID(),
				text: message,
				sender: 'user',
				step: chatHistory[chatHistory.length - 1].step,
				date: new Date().toISOString(),
				textType: 'text',
				isMenu: false,
			} : {
				id: crypto.randomUUID(),
				text: message,
				sender: 'user',
				step: 0,
				date: new Date().toISOString(),
				textType: 'text',
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
					onClick={() => setShowCsvTab(!showCsvTab)}
				>
					{showCsvTab ? 'VOLTAR' : 'EXPORT CSV'}
				</button>
			</div>

			{
				showCsvTab ? (
					<ExportData />
				)
					: <>
						<Chat chatHistory={chatHistory} />
						<Input onSubmit={handleSubmit} />
					</>
			}
      
		</>
	);
}

export default App;
