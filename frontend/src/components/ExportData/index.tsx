import styles from './styles.module.scss';

export default function index() {
	return (
		<div className={styles.csvContainer}>
			<div className={styles.csvExportAllContainer}>
				<button className={styles.csvExportAll}>EXPORTAR TODOS</button>
			</div>
      CSV DATA
		</div>
	);
}
