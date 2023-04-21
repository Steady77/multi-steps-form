import { FC } from 'react';
import styles from './sidebar.module.scss';
import ProgressSteps from '../../ui/progress-steps/progress-steps';

const Sidebar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.inner}>
				<div>
					<h2 className={styles.title}>Создание аккаунта</h2>
					<p className={styles.text}>
						Заполните все пункты данной формы и нажмите кнопку «Сохранить».
					</p>
				</div>
				<ProgressSteps />
			</div>
		</aside>
	);
};

export default Sidebar;
