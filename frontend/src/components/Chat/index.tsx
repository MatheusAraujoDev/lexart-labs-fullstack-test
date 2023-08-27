import styles from './styles.module.scss';
import ChatMessage from '../ChatMessage';
import { IChatHistory } from '../../App';

interface IChatProps {
  chatHistory: IChatHistory[];
}

export default function index({ chatHistory } : IChatProps) {
	return (
		<div className={styles.chatMessages}>
			<ChatMessage chatHistory={chatHistory} />
		</div>
	);
}
