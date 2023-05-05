import { FC } from 'react';
import styles from './form-header.module.scss';

interface FormHeaderProps {
	icon: string;
	title: string;
	text: string;
}

const FormHeader: FC<FormHeaderProps> = ({ icon, text, title }) => {
	return (
		<>
			<img className={styles.image} src={icon} alt="icon" />
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.text}>{text}</p>
		</>
	);
};

export default FormHeader;
