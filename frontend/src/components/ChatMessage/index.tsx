import { IChatHistory } from '../../App';
import Menu from '../Menu';
import styles from './styles.module.scss';

interface IChatMessageProps {
  chatHistory: IChatHistory[];
	handleOptionClick: (value: string) => void;
}

export default function index({ chatHistory, handleOptionClick }: IChatMessageProps) {

	function formatDate(date: string) {
		const d = new Date(date);
		d.setHours(d.getHours() - 3);

		const [isoDate, timeWithMS] = d.toISOString().split('T');

		const [year, month, day] = isoDate.split('-');
		const [time] = timeWithMS.split('.');
		
		return `${month}/${day}/${year} ${time}`;
	}

	return (
		<>
			{
				chatHistory.map((chat, index) => {
					const auxClass = chat.sender === 'user' ? styles.user : styles.chatBot;

					return(
						<div key={index} className={`${styles.messageBox} ${auxClass}`}>
							{chat.sender === 'user' ?
								<h4>👨‍💻 {chat?.userName ? chat.userName : 'User'}</h4>
								: <h4>🤖 ChatBot</h4>}

							{
								chat.isMenu ?
									<>
										<Menu
											title={chat.menuTitle!}
											options={chat.menuOptions!}
											onClick={(param) => handleOptionClick(param)}
										/>
									</>
									:
									chat.sender === 'bot' ?
										<p dangerouslySetInnerHTML={{__html:chat.text}}></p>
										: <p>{chat.text}</p>
							}

							<h5 className={styles.textDate}>{
								formatDate(chat.date)
							}</h5>
						</div>
					);
				})
			}
		</>
		
	);
}
