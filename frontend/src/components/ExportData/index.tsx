import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { api } from '../../services/api';
import ExportDataCard from '../ExportDataCard';

export interface IChatHistory {
	id: string;
	createdAt: string;
	user: {
		userName: string;
	};
}

interface IExportDataProps {
	isChatFinished: boolean;
	userId?: string;
}

export default function index({ isChatFinished, userId }: IExportDataProps) {
	const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);

	async function fetchChatHistory() {
		if(isChatFinished) {
			const response = await api.get<IChatHistory[]>(`/chatHistory/${userId}`);
			setChatHistory(response.data);
		}
	}

	useEffect(() => {
		fetchChatHistory();
	}, []);

	return (
		<div className={styles.csvContainer}>
			<h3 className={styles.csvPageTitle}>Click to Export your Chat</h3>
			
			<div className={styles.csvCardContainer}>
				{
					chatHistory.map((chat, index) => {
						return <ExportDataCard
							chatHistoryId={chat.id}
							createdAt={chat.createdAt}
							userName={chat.user.userName}
							key={index}
						/>;
					})
				}
			</div>
		</div>
	);
}
