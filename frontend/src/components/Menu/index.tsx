import styles from './styles.module.scss';

interface IMenuProps {
  title: string;
  options: string[];
  onClick: (value: string) => void;
}

export default function index({ title, options, onClick }: IMenuProps) {
	return (
		<div className={styles.messageBox}>
			<h3>{title}</h3>

			<div className={styles.menu}>
				{
					options.map((option, index) => {
						return (
							<div key={index} className={styles.menuItem}>
								<button onClick={() => onClick(option)}>{option}</button>
							</div>
						);
          
					})
				}
			</div>
			
		</div>
	);
}
