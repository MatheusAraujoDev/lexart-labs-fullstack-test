import { exportChatCSV, formatDate } from '../../utils';
import styles from './styles.module.scss';

export interface IChatHistory {
	chatHistoryId: string;
	createdAt: string;
  userName: string;
}

export default function index({ chatHistoryId, createdAt, userName }: IChatHistory) {

	return (
		<div className={styles.card}>
			<p>Chat - {formatDate(createdAt)}</p>
			<button
				onClick={() => exportChatCSV(chatHistoryId, createdAt, userName)}
				className={styles.csvButton}
			>
				{'EXPORT CHAT'}
			</button>
		</div>
	);
}
