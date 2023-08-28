import styles from './styles.module.scss';
import ChatMessage from '../ChatMessage';
import { IChatHistory } from '../../App';
// import { useEffect, useRef } from 'react';

interface IChatProps {
  chatHistory: IChatHistory[];
	handleOptionClick: (value: string) => void;
}

export default function index({ chatHistory, handleOptionClick } : IChatProps) {
	// const chatBoxRef = useRef<HTMLDivElement | null>(null);

	// useEffect(() => {
	// 	if (chatBoxRef.current) {
	// 		chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
	// 	}
	// }, [chatHistory]);
	
	return (
		<div
			className={styles.chatMessages}
			// ref={chatBoxRef}
		>
			<ChatMessage
				chatHistory={chatHistory}
				handleOptionClick={(param) => handleOptionClick(param)}
			/>
		</div>
	);
}
