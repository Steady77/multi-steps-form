import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

import styles from './input.module.scss';

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	label?: string;
}

const Input = forwardRef<HTMLInputElement, InputType>(
	(
		{ placeholder, error, type = 'text', className, label, children, ...rest },
		ref,
	) => {
		return (
			<div className={cn(styles.inputWrapper, className)}>
				<p className={styles.label}>{label}</p>
				<label>
					<input
						placeholder={placeholder}
						ref={ref}
						type={type}
						{...rest}
						className={styles.input}
					/>
					<span>{children}</span>
				</label>
				{error && <div className={styles.error}>{error}</div>}
			</div>
		);
	},
);

Input.displayName = 'Input';

export default Input;
