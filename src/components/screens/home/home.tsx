import { FC } from 'react';
import styles from './home.module.scss';
import Sidebar from '../../ui/sidebar/sidebar';
import Content from '../../ui/content/content';

const Home: FC = () => {
	return (
		<div className={styles.home}>
			<Sidebar />
			<Content />
		</div>
	);
};

export default Home;
