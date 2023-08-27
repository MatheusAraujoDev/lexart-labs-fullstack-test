import { IChatHistory } from '../../App';
import styles from './styles.module.scss';

interface IChatMessageProps {
  chatHistory: IChatHistory[];
}

export default function index({ chatHistory }: IChatMessageProps) {

	return (
		<>
			{
				chatHistory.length ?
					chatHistory.map((chat, index) => {
						const auxClass = chat.sender === 'user' ? styles.user : styles.chatBot;

						return(
							<div key={index} className={`${styles.messageBox} ${auxClass}`}>
								{chat.sender === 'user' ? <h4>👨‍💻 User</h4> : <h4>🤖 ChatBot</h4>}
								<p>{chat.text}</p>
								<h4>{chat.date}</h4>
							</div>
						);
					})
					: (
						<div className={`${styles.messageBox} ${styles.chatBot}`}>
							<h4>🤖 ChatBot</h4>
							<p>Send your first message!</p>
							<h4>{new Date().toISOString()}</h4>
						</div>
					)
			}
		</>
		
	);
}
