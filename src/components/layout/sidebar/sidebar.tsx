import { FC } from 'react';

import ProgressSteps from '@/ui/progress-steps/progress-steps';

import styles from './sidebar.module.scss';

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
