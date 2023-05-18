import { FC, PropsWithChildren } from 'react';

import styles from './layout.module.scss';
import Sidebar from './sidebar/sidebar';

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
