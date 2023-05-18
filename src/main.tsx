import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/styles/index.scss';

import FormsStateProvider from './providers/forms-state-provider';
import Router from './routes/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<FormsStateProvider>
			<Router />
		</FormsStateProvider>
	</React.StrictMode>,
);
