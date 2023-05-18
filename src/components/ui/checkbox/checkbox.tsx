import { InputHTMLAttributes, forwardRef } from 'react';

import styles from './checkbox.module.scss';

type CheckboxType = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxType>(
	({ children, ...rest }, ref) => {
		return (
			<label className={styles.label}>
				<input className={styles.input} type="checkbox" ref={ref} {...rest} />
				<span className={styles.span}></span>
				<span>{children}</span>
			</label>
		);
	},
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
