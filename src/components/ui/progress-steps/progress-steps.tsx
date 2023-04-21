import { FC } from 'react';
import { steps } from './progress-steps.data';
import styles from './progress-steps.module.scss';
import cn from 'classnames';

const ProgressSteps: FC = () => {
	return (
		<ul>
			{steps.map(({ label, step }) => (
				<li key={step} className={cn(styles.item)}>
					<span className={styles.circle}>{step}</span>
					<span className={styles.text}>{label}</span>
				</li>
			))}
		</ul>
	);
};

export default ProgressSteps;
