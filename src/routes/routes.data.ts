import { FC } from 'react';
import Home from '../components/screens/home/home';

interface Routes {
	path: string;
	component: FC;
}

export const routes: Routes[] = [
	{
		path: '/',
		component: Home,
	},
];
