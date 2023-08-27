import styles from './styles.module.scss';
import ChatMessage from '../ChatMessage';
import { IChatHistory } from '../../App';

interface IChatProps {
  chatHistory: IChatHistory[];
	handleOptionClick: (value: string) => void;
}

export default function index({ chatHistory, handleOptionClick } : IChatProps) {
	return (
		<div className={styles.chatMessages}>
			<ChatMessage
				chatHistory={chatHistory}
				handleOptionClick={(param) => handleOptionClick(param)}
			/>
		</div>
	);
}
