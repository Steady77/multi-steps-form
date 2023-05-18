import cn from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useFormsState } from '../../../hooks/use-forms-state';

import { steps } from './progress-steps.data';
import styles from './progress-steps.module.scss';

const ProgressSteps: FC = () => {
	const { pathname } = useLocation();

	const {
		formsState: { activeStep },
	} = useFormsState();

	return (
		<ul>
			{steps.map(({ label, step, path }) => (
				<li
					key={step}
					className={cn(styles.item, {
						[styles.active]: path === pathname,
						[styles.checked]: step < activeStep,
					})}
				>
					<span className={styles.circle}>{step}</span>
					<span className={styles.text}>{label}</span>
				</li>
			))}
		</ul>
	);
};

export default ProgressSteps;
