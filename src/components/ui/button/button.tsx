import { ButtonHTMLAttributes, FC } from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'text';
}

const Button: FC<ButtonType> = ({ children, className, variant, ...rest }) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.text]: variant === 'text',
			})}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
