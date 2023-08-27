import { useState } from 'react';
import styles from './styles.module.scss';
import {BiSolidSend} from 'react-icons/bi';

interface IPropsInput {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, inputText: string) => void;
}

export default function Input({ onSubmit }: IPropsInput) {
	const [message, setMessage] = useState('');


	return (
		<form
			className={styles.inputContainer}
			onSubmit={(event) => {
				const text = message;
				onSubmit(event, text);
				setMessage('');
			}} >
			<div className={styles.inputContent}>
				<input
					placeholder='Send a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button><BiSolidSend /></button>
			</div>
		</form>
	);
}
