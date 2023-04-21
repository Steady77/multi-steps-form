import { FC, PropsWithChildren } from 'react';
import Sidebar from './sidebar/sidebar';
import styles from './layout.module.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="container">
			<div className={styles.layout}>
				<Sidebar />
				<main className={styles.content}>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
