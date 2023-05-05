interface Steps {
	label: string;
	step: number;
	path: string;
}

export const steps: Steps[] = [
	{
		label: 'Общие',
		step: 1,
		path: '/',
	},
	{
		label: 'Форма собственности',
		step: 2,
		path: '/ownership-form',
	},
	{
		label: 'Адрес регистрации',
		step: 3,
		path: '/register-address',
	},
	{
		label: 'Адрес проживания',
		step: 4,
		path: '/residential-address',
	},
	{
		label: 'Социальные сети',
		step: 5,
		path: '/social-form',
	},
];
